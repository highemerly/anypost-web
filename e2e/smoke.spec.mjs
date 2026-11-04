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
