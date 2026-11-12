<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-xs">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="shrink-0 flex items-center">
              <div class="flex items-center space-x-3">
                <h1 class="text-xl font-bold text-gray-900">
                  AnyPost<span class="text-sm text-gray-600">.dev</span>
                </h1>
                <!-- Tech Preview Only
                <span class="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-blue-100 text-blue-700">
                  {{ $t('common.techPreview') }}
                </span>
                -->
              </div>
            </router-link>
          </div>

          <!-- gap: v4 の space-x は「最後以外の子の右」に余白を付けるので、モバイルで隠れるナビが後ろにあると切り替えが左にずれる -->
          <div class="flex items-center gap-4">
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
                to="/services"
                class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                {{ $t('nav.services') }}
              </router-link>
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
                <router-link to="/services#license" class="text-base text-gray-500 hover:text-gray-900">
                  {{ $t('nav.license') }}
                </router-link>
              </li>
              <li>
                <router-link to="/contact" class="text-base text-gray-500 hover:text-gray-900">
                  {{ $t('nav.contact') }}
                </router-link>
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
            <router-link to="/services#license" class="underline hover:text-gray-600">
              {{ $t('footer.licenseLink') }}
            </router-link>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
</script>
