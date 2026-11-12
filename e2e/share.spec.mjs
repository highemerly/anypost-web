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

// 共有先ごとの URL の組み立て。本文の欄しかない共有先へは、URL を本文の後ろに付けて渡す
const SHARE = 't=Hello%20AnyPost&s=https://example.com/&a=1'
const REDIRECTS = [
  {
    server: 'akkoma.example',
    target: 'https://akkoma.example/',
    params: { message: 'Hello AnyPost https://example.com/' }
  },
  {
    server: 'linkedin.com',
    target: 'https://www.linkedin.com/sharing/share-offsite/',
    params: { url: 'https://example.com/' }
  },
  {
    server: 'bsky.app',
    target: 'https://bsky.app/intent/compose',
    params: { text: 'Hello AnyPost https://example.com/' }
  },
  {
    server: 'wa.me',
    target: 'https://wa.me/',
    params: { text: 'Hello AnyPost https://example.com/' }
  }
]

for (const { server, target, params } of REDIRECTS) {
  test(`builds the share URL for ${server}`, async ({ page }) => {
    const { hostname } = new URL(target)
    const navigation = page.waitForRequest(
      (r) => r.isNavigationRequest() && new URL(r.url()).hostname === hostname
    )
    await page.goto(`/share?i=${server}&${SHARE}`)

    const url = new URL((await navigation).url())
    expect(`${url.origin}${url.pathname}`).toBe(target)
    expect(Object.fromEntries(url.searchParams)).toEqual(params)
  })
}

// API が種類を返しても、共有先の画面が無いもの（GoToSocial など）は「対応していない」と出すこと
test('shows unsupported for a recognized server without a share page', async ({ page }) => {
  await page.goto('/share?i=gotosocial.example&a=1')
  await expect(page.getByText('This server is not supported.')).toBeVisible()
  await expect(page.getByText('(gotosocial)')).toBeVisible()
})

// API が 404（nodeinfo が無い）を返すサーバーは、遷移せずに「対応していない」と出すこと
test('shows unsupported for an unknown server', async ({ page }) => {
  await page.goto('/share?i=unknown.example&a=1')
  await expect(page.getByText('This server is not supported.')).toBeVisible()
})

// 投稿したサーバーを、同意を求めずにブラウザへ記憶し、次に共有画面を開いたとき候補に出すこと
// （Cookie の同意 UI は無い。プライバシーポリシーの「ブラウザ内の保存領域」の lastUsedServer）
test('remembers the last used server without asking', async ({ page }) => {
  const navigation = page.waitForRequest(
    (r) => r.isNavigationRequest() && new URL(r.url()).hostname === 'mastodon.example'
  )
  await page.goto('/share?i=mastodon.example&a=1')
  await navigation

  await page.goto('/share')
  await expect(page.locator('option', { hasText: 'mastodon.example (previously used)' })).toBeAttached()
  await expect(page.getByRole('button', { name: 'Clear server history' })).toBeVisible()
})
