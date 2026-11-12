import { test as base, expect } from '@playwright/test'

export const FAKE_API = 'http://127.0.0.1:18080'

// 全テスト共通:
// - 外への通信（Google Fonts・共有先のサーバー）は止める。結果を外のサービスの
//   都合に左右させないため。止めたリクエストも 'request' イベントには出るので、遷移先の確認には使える
// - 未捕捉の JS 例外が1つでも出たら落とす（コンソールのエラー全般は見ない）
export const test = base.extend({
  page: async ({ page }, use) => {
    const errors = []
    page.on('pageerror', (e) => errors.push(e.message))
    await page.route((url) => url.hostname !== '127.0.0.1', (route) => route.abort())
    await use(page)
    expect(errors, 'uncaught JS errors').toEqual([])
  }
})

export { expect }
