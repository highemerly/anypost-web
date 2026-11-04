import { test, expect, FAKE_API } from './fixtures.mjs'

// 共有リンク（/share?i=...&a=1）から、API でサーバーの種類を引いて、共有先の画面へ自動で移ること。
// パラメータは使い方のページ（HowToPage.vue）の例と同じ形。
test('auto-redirects to the Mastodon share page', async ({ page, request }) => {
  const navigation = page.waitForRequest(
    (r) => r.isNavigationRequest() && new URL(r.url()).hostname === 'mastodon.example'
  )
  await page.goto('/share?i=mastodon.example&t=Hello%20AnyPost&s=https://example.com/&v=unlisted&a=1')

  const url = new URL((await navigation).url())
  expect(`${url.origin}${url.pathname}`).toBe('https://mastodon.example/share')
  expect(Object.fromEntries(url.searchParams)).toEqual({
    text: 'Hello AnyPost',
    url: 'https://example.com/',
    visibility: 'unlisted'
  })

  // nginx の /api プロキシが、パスを変えずに API へ渡していること
  const received = await (await request.get(`${FAKE_API}/__requests`)).json()
  expect(received).toContainEqual({ method: 'GET', url: '/api/v1/instances/mastodon.example' })
})

// API が 404（nodeinfo が無い）を返すサーバーは、遷移せずに「対応していない」と出すこと
test('shows unsupported for an unknown server', async ({ page }) => {
  await page.goto('/share?i=unknown.example&a=1')
  await expect(page.getByText('This server is not supported.')).toBeVisible()
})
