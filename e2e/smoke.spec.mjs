import { test, expect } from './fixtures.mjs'

// 直接開いても nginx の SPA 設定（try_files）で index.html が返り、Vue が描画まで進むこと。
// 開いただけでは外（別のドメイン）へリクエストを出さないこと（フォントも同梱した Inter を自分のドメインから読む）。
// プライバシーポリシーにそう書いてある。Cloudflare がエッジで差し込むもの（Web Analytics など）は
// イメージには無いので、ここでは確かめられない（Cloudflare 側で切ってある前提）
const PAGES = ['/', '/share', '/privacy', '/howto', '/license', '/services', '/contact']

for (const path of PAGES) {
  test(`${path} renders`, async ({ page, baseURL }) => {
    const external = []
    page.on('request', (req) => {
      if (new URL(req.url()).origin !== new URL(baseURL).origin) external.push(req.url())
    })
    const res = await page.goto(path)
    expect(res.status()).toBe(200)
    await expect(page.locator('#app main')).not.toBeEmpty()
    await page.waitForLoadState('networkidle')
    const interLoaded = await page.evaluate(async () => {
      await document.fonts.ready
      return [...document.fonts].some((f) => f.family.replace(/["']/g, '') === 'Inter Variable' && f.status === 'loaded')
    })
    expect(interLoaded, 'Inter is loaded').toBe(true)
    expect(external, 'requests to other origins').toEqual([])
  })
}

// RUM のビーコンは index.html に直接書いてあり、本番では手前のルーティングがコレクタへ回す。
// ルートの無いここでは nginx が 404 を返す（SPA の index.html が返らない）
test('RUM beacon is in <head> and /_n-rum/ is 404 without the route', async ({ page, request }) => {
  await page.goto('/')
  await expect(page.locator('head script[src="/_n-rum/beacon.js"][async]')).toHaveCount(1)

  for (const path of ['beacon.js', 'web-vitals.js', 'rum-config.json', 'collect']) {
    const res = await request.get(`/_n-rum/${path}`)
    expect(res.status(), path).toBe(404)
  }
})

// 以前の Cookie 同意 UI と Google Analytics の残り（cookieConsent と _ga* の Cookie）を起動時に消すこと
test('clears leftovers of the old consent UI and Google Analytics', async ({ page, context, baseURL }) => {
  const { hostname } = new URL(baseURL)
  await context.addCookies([
    { name: '_ga', value: 'GA1.1.1.1', domain: hostname, path: '/' },
    { name: '_ga_PQ2HSYKKQF', value: 'GS1.1.1', domain: hostname, path: '/' }
  ])
  await page.addInitScript(() => {
    if (!sessionStorage.getItem('seeded')) {
      sessionStorage.setItem('seeded', '1')
      localStorage.setItem('cookieConsent', 'accepted')
    }
  })

  await page.goto('/')
  await expect(page.locator('#app main')).not.toBeEmpty()
  expect(await page.evaluate(() => localStorage.getItem('cookieConsent'))).toBeNull()
  expect(await context.cookies()).toEqual([])
})
