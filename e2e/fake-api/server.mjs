// 偽の instance-info-api（標準ライブラリだけ）。本番では Ingress が /api を instance-info-api へ
// 振り分けるが、E2E ではイメージ内の nginx の /api プロキシ（API_UPSTREAM）からここへ届く。
// 応答の形は instance-info-api の Api::V1::InstancesController#response_json に合わせる。
// 受けたリクエストを記録し、テストは GET /__requests で取り出す。
import { createServer } from 'node:http'

const UPDATED_AT = '2026-01-01T00:00:00Z'

// ここに無いサーバーは「nodeinfo が無い」扱い（本物は 404 と type: unknown を返す）
const KNOWN = {
  'mastodon.example': { type: 'mastodon', software: 'mastodon', version: '4.3.0', total_users: 1234 },
  'misskey.example': { type: 'misskey', software: 'misskey', version: '2025.1.0', total_users: 567 }
}

const requests = []

const send = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(body))
}

createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://fake-api')

  if (pathname === '/__health') return send(res, 200, { ok: true })
  if (pathname === '/__requests') return send(res, 200, requests)

  requests.push({ method: req.method, url: req.url })

  const m = pathname.match(/^\/api\/v1\/instances\/([^/]+)$/)
  if (req.method !== 'GET' || !m) return send(res, 404, { error: 'not found' })

  const name = decodeURIComponent(m[1])
  const known = KNOWN[name]
  if (known) {
    return send(res, 200, { name, ...known, status: null, updated_at: UPDATED_AT, source: 'nodeinfo' })
  }
  return send(res, 404, {
    name,
    type: 'unknown',
    software: 'unknown',
    version: 'unknown',
    updated_at: UPDATED_AT,
    source: 'error:no-data'
  })
}).listen(8080, '0.0.0.0')
