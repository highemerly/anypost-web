import { test, expect } from './fixtures.mjs'

// 直接開いても nginx の SPA 設定（try_files）で index.html が返り、Vue が描画まで進むこと
const PAGES = ['/', '/share', '/privacy', '/howto', '/license', '/services', '/contact']

for (const path of PAGES) {
  test(`${path} renders`, async ({ page }) => {
    const res = await page.goto(path)
    expect(res.status()).toBe(200)
    await expect(page.locator('#app main')).not.toBeEmpty()
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
