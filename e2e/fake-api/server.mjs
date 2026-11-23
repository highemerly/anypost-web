// 偽の instance-info-api（標準ライブラリだけ）。本番では Ingress が /api を instance-info-api へ
// 振り分けるが、E2E ではイメージ内の nginx の /api プロキシ（API_UPSTREAM）からここへ届く。
// 応答の形は instance-info-api の Api::V2::InstancesController（GET /api/v2/instances/:name）に合わせる。
// 受けたリクエストを記録し、テストは GET /__requests で取り出す。
import { createServer } from 'node:http'

const FETCHED_AT = '2026-01-01T00:00:00Z'

// ここに無いサーバーは「nodeinfo が無い」扱い（本物は 404 と error.code: not_fediverse を返す）
const KNOWN = {
  'mastodon.example': { type: 'mastodon', software: 'mastodon', version: '4.3.0', users: 1234 },
  'misskey.example': { type: 'misskey', software: 'misskey', version: '2025.1.0', users: 567 },
  'akkoma.example': { type: 'pleroma', software: 'akkoma', version: '3.15.0', users: 12 },
  'hubzilla.example': { type: 'hubzilla', software: 'hubzilla', version: '10.4', users: 8 },
  'snac.example': { type: 'snac', software: 'snac', version: '2.80', users: 1 },
  'piefed.example': { type: 'piefed', software: 'piefed', version: '1.3.0', users: 90 },
  'iceshrimp.example': { type: 'iceshrimp.net', software: 'Iceshrimp.NET', version: '2025.1', users: 20 },
  // API が種類を返すが、AnyPost に共有先の画面が無いもの
  'gotosocial.example': { type: 'gotosocial', software: 'gotosocial', version: '0.20.0', users: 3 }
}

// instance-info-api の config/builtin_services.yml にある、Fediverse 以外のサービス
const BUILTIN = {
  'linkedin.com': { type: 'linkedin', name: 'LinkedIn' },
  'bsky.app': { type: 'bluesky', name: 'Bluesky' },
  'wa.me': { type: 'whatsapp', name: 'WhatsApp' },
  'tumblr.com': { type: 'tumblr', name: 'Tumblr' },
  'taittsuu.com': { type: 'taittsuu', name: 'タイッツー' }
}

// エラーを返すサーバー（コードと HTTP ステータスは本物と同じ）
const ERRORS = {
  'unresolvable.example': [404, 'unresolvable', 'the domain does not resolve'],
  'down.example': [503, 'upstream_unavailable', 'the server could not be reached; try again later']
}

const requests = []

const send = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(body))
}

const fediverse = (domain, { type, software, version, users }) => ({
  domain,
  kind: 'fediverse',
  type,
  software: { name: software, version },
  node_name: domain,
  thumbnail_url: null,
  icon_url: null,
  max_characters: { halfwidth: 500, fullwidth: 500 },
  open_registrations: true,
  usage: { total_users: users, active_month: null, active_halfyear: null, local_posts: null },
  fetched_at: FETCHED_AT,
  cache: 'hit'
})

const service = (domain, { type, name }) => ({
  domain,
  kind: 'service',
  type,
  software: null,
  node_name: name,
  thumbnail_url: null,
  icon_url: null,
  max_characters: null,
  open_registrations: true,
  usage: null,
  fetched_at: null,
  cache: 'builtin'
})

const error = (domain, code, message) => ({ domain, error: { code, message } })

createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://fake-api')

  if (pathname === '/__health') return send(res, 200, { ok: true })
  if (pathname === '/__requests') return send(res, 200, requests)

  requests.push({ method: req.method, url: req.url })

  const m = pathname.match(/^\/api\/v2\/instances\/([^/]+)$/)
  if (req.method !== 'GET' || !m) return send(res, 404, { error: 'not found' })

  const name = decodeURIComponent(m[1])
  if (KNOWN[name]) return send(res, 200, fediverse(name, KNOWN[name]))
  if (BUILTIN[name]) return send(res, 200, service(name, BUILTIN[name]))
  if (ERRORS[name]) {
    const [status, code, message] = ERRORS[name]
    return send(res, status, error(name, code, message))
  }
  return send(res, 404, error(name, 'not_fediverse', 'no nodeinfo; not a fediverse server'))
}).listen(8080, '0.0.0.0')
