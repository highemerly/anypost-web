import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
// Inter は npm パッケージから同梱して自分のドメインから配る（Google Fonts から読むと、ページを開くたびに
// IP アドレスなどが Google に送られるため）。ウェイトは可変フォント1つで 100〜900 をまかなう
import '@fontsource-variable/inter'
import './assets/tailwind.css'

// i18n設定
import ja from './locales/ja.json'
import en from './locales/en.json'

// 以前の Cookie 同意 UI と Google Analytics の残り（同意した人のブラウザにだけある）を消す。
// GA の Cookie（_ga, _ga_<ID>）は anypost.dev のドメインに付いているので domain を付けて期限切れにする
localStorage.removeItem('cookieConsent')
for (const name of document.cookie.split('; ').map((c) => c.split('=')[0]).filter((n) => n.startsWith('_ga'))) {
  document.cookie = `${name}=; Max-Age=0; path=/; domain=${location.hostname}`
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || navigator.language.split('-')[0] || 'en',
  fallbackLocale: 'en',
  messages: {
    ja,
    en
  }
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
