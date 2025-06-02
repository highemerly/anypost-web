<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Cookie Banner -->
    <CookieBanner
      v-if="showCookieBanner"
      @accept="acceptCookies"
      @decline="declineCookies"
    />

    <!-- Header -->
    <header class="bg-white shadow-sm">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex-shrink-0 flex items-center">
              <div class="flex items-center space-x-3">
                <h1 class="text-xl font-bold text-gray-900">
                  AnyPost<span class="text-sm text-gray-600">.dev</span>
                </h1>
                <!-- Tech Preview Only
                <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                  {{ $t('common.techPreview') }}
                </span>
                -->
              </div>
            </router-link>
          </div>

          <div class="flex items-center space-x-4">
            <!-- Language Switcher -->
            <LanguageSwitcher />

            <!-- Navigation Links -->
            <div class="hidden md:flex items-center space-x-4">
              <router-link
                to="/share"
                class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                {{ $t('nav.share') }}
              </router-link>
              <router-link
                to="/howto"
                class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                {{ $t('nav.howto') }}
              </router-link>
              <router-link
                to="/privacy"
                class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                {{ $t('nav.privacy') }}
              </router-link>
              <router-link
                to="/license"
                class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                {{ $t('nav.license') }}
              </router-link>

              <!-- Cookie Settings Link -->
              <button
                @click="showCookieSettings"
                class="text-gray-500 hover:text-blue-600 px-2 py-1 text-xs"
              >
                {{ $t('cookies.changeSettings') }}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-16">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              {{ $t('footer.product') }}
            </h3>
            <ul class="mt-4 space-y-4">
              <li>
                <router-link to="/share" class="text-base text-gray-500 hover:text-gray-900">
                  {{ $t('nav.share') }}
                </router-link>
              </li>
              <li>
                <router-link to="/howto" class="text-base text-gray-500 hover:text-gray-900">
                  {{ $t('nav.howto') }}
                </router-link>
              </li>
              <li>
                <router-link to="/services" class="text-base text-gray-500 hover:text-gray-900">
                  {{ $t('nav.services') }}
                </router-link>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              {{ $t('footer.legal') }}
            </h3>
            <ul class="mt-4 space-y-4">
              <li>
                <router-link to="/privacy" class="text-base text-gray-500 hover:text-gray-900">
                  {{ $t('nav.privacy') }}
                </router-link>
              </li>
              <li>
                <router-link to="/license" class="text-base text-gray-500 hover:text-gray-900">
                  {{ $t('nav.license') }}
                </router-link>
              </li>
              <li>
                <router-link to="/contact" class="text-base text-gray-500 hover:text-gray-900">
                  {{ $t('nav.contact') }}
                </router-link>
              </li>
              <li>
                <button
                  @click="showCookieSettings"
                  class="text-base text-gray-500 hover:text-gray-900 text-left"
                >
                  {{ $t('cookies.changeSettings') }}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              {{ $t('footer.language') }}
            </h3>
            <div class="mt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <div class="mt-8 border-t border-gray-200 pt-8">
          <p class="text-sm text-gray-400 text-center leading-relaxed">
            {{ $t('footer.description') }}
            Misskey: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" class="underline">BY-NC-SA 4.0</a>,
            GNU social: <a href="https://creativecommons.org/licenses/by-sa/4.0/" class="underline">CC BY-SA 4.0</a>.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CookieBanner from '@/components/CookieBanner.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const showCookieBanner = ref(false)

onMounted(() => {
  checkCookieConsent()

  // Initialize analytics if already consented
  initializeAnalytics()

  // Cookie設定表示リクエストのリスナー
  window.addEventListener('requestCookieSettings', () => {
    showCookieBanner.value = true
  })
})

const checkCookieConsent = () => {
  const cookieConsent = localStorage.getItem('cookieConsent')
  if (!cookieConsent) {
    showCookieBanner.value = true
  }
}

const showCookieSettings = () => {
  showCookieBanner.value = true
}

const acceptCookies = () => {
  localStorage.setItem('cookieConsent', 'accepted')
  showCookieBanner.value = false

  // Initialize Google Analytics
  initializeAnalytics()

  // Trigger event for other components to update
  window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: 'accepted' }))
}

const declineCookies = () => {
  localStorage.setItem('cookieConsent', 'declined')
  showCookieBanner.value = false
  // Clear any existing server history
  localStorage.removeItem('lastUsedServer')

  // Disable analytics if already loaded
  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied'
    })
  }

  // Trigger event for other components to update
  window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: 'declined' }))
}

const initializeAnalytics = () => {
  // Only initialize if user has consented
  const consent = localStorage.getItem('cookieConsent')
  if (consent !== 'accepted') return

  // Add Google Analytics script
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-PQ2HSYKKQF'
  document.head.appendChild(script1)

  // Add gtag configuration
  const script2 = document.createElement('script')
  script2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-PQ2HSYKKQF', {
      cookie_flags: 'SameSite=None;Secure'
    });
  `
  document.head.appendChild(script2)
}
</script>
