import { defineConfig, devices } from '@playwright/test'

// 起動は e2e/compose.yml（web: 127.0.0.1:8080・fake-api の記録口: 127.0.0.1:18080）。
// リトライはしない（たまに落ちるテストは直すか消す）。
export default defineConfig({
  testDir: '.',
  outputDir: './test-results',
  retries: 0,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [['list'], ['html', { outputFolder: './playwright-report', open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:8080',
    // 画面の言語はブラウザの言語で決まる。文言で確かめる箇所があるので英語に固定する
    locale: 'en-US',
    trace: 'retain-on-failure'
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
})
