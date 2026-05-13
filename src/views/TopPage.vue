<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600">
      <div class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {{ $t('top.hero.title') }}
            <span class="block">{{ $t('top.hero.subtitle') }}</span>
          </h1>
          <p class="mt-6 max-w-3xl mx-auto text-xl text-blue-100">
            {{ $t('top.hero.description') }}
          </p>
          <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/howto"
              class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors shadow-lg"
            >
              {{ $t('top.hero.howTo') }}
            </router-link>
            <router-link
              to="/share"
              class="inline-flex items-center justify-center px-6 py-2 border border-white text-sm font-medium rounded-md text-white bg-transparent hover:bg-white hover:bg-opacity-10 md:py-3 md:text-base md:px-8 transition-colors"
            >
              {{ $t('top.hero.cta') }}
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Supported Services Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 mb-4">
            {{ $t('top.supportedServices.title') }}
          </h2>
          <p class="text-lg text-gray-600">
            {{ $t('top.supportedServices.description') }}
          </p>
        </div>

        <!-- Fediverse Services -->
        <div class="mb-16">
          <h3 class="text-2xl font-bold text-center text-gray-800 mb-8">
            {{ $t('top.supportedServices.fediverse.title') }}
          </h3>
          <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8">
            <div
              v-for="service in fediverseServices"
              :key="service.name"
              class="flex flex-col items-center p-6 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div class="w-20 h-20 mb-4 flex items-center justify-center">
                <img
                  :src="service.icon"
                  :alt="service.name"
                  class="w-16 h-16 object-contain"
                  @error="handleImageError"
                />
              </div>
              <span class="text-sm font-medium text-gray-700 capitalize text-center">
                {{ service.displayName }}
              </span>
            </div>
          </div>
        </div>

        <!-- Non-Fediverse Services -->
        <div>
          <h3 class="text-2xl font-bold text-center text-gray-800 mb-8">
            {{ $t('top.supportedServices.traditional.title') }}
          </h3>
          <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8">
            <div
              v-for="service in traditionalServices"
              :key="service.name"
              class="flex flex-col items-center p-6 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div class="w-20 h-20 mb-4 flex items-center justify-center">
                <img
                  :src="service.icon"
                  :alt="service.name"
                  class="w-16 h-16 object-contain"
                  @error="handleImageError"
                />
              </div>
              <span class="text-sm font-medium text-gray-700 text-center">
                {{ service.displayName }}
              </span>
            </div>
          </div>
        </div>

        <!-- More Services Notice -->
        <div class="mt-12 text-center">
          <router-link
            to="/services"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {{ $t('top.supportedServices.viewAllServices') }}
            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900">
            {{ $t('top.features.title') }}
          </h2>
        </div>

        <div class="mt-16">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <!-- Multi-Platform Feature -->
            <div class="text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-md bg-blue-500 text-white mx-auto">
                <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-4H3m16 8H5" />
                </svg>
              </div>
              <h3 class="mt-6 text-lg font-medium text-gray-900">
                {{ $t('top.features.multiPlatform.title') }}
              </h3>
              <p class="mt-2 text-base text-gray-500">
                {{ $t('top.features.multiPlatform.description') }}
              </p>
            </div>

            <!-- Privacy Feature -->
            <div class="text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-md bg-purple-500 text-white mx-auto">
                <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 class="mt-6 text-lg font-medium text-gray-900">
                {{ $t('top.features.privacy.title') }}
              </h3>
              <p class="mt-2 text-base text-gray-500">
                {{ $t('top.features.privacy.description') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-white">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span class="block">Ready to start sharing?</span>
          <span class="block text-blue-600">Try AnyPost.dev today.</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <router-link
              to="/howto"
              class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              {{ $t('top.hero.howTo') }}
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Fediverse services
const fediverseServices = ref([
  { name: 'mastodon', displayName: 'Mastodon', icon: '/assets/brand/mastodon.png' },
  { name: 'misskey', displayName: 'Misskey', icon: '/assets/brand/misskey.png' },
  { name: 'bluesky', displayName: 'Bluesky', icon: '/assets/brand/bluesky.png' },
  { name: 'friendica', displayName: 'Friendica', icon: '/assets/brand/friendica.png' },
  { name: 'pleroma', displayName: 'Pleroma', icon: '/assets/brand/pleroma.png' },
  { name: 'gnusocial', displayName: 'GNU Social', icon: '/assets/brand/gnusocial.png' }
])

// Traditional/Non-fediverse services
const traditionalServices = ref([
  { name: 'twitter', displayName: 'X (Twitter)', icon: '/assets/brand/twitter.png' },
  { name: 'facebook', displayName: 'Facebook', icon: '/assets/brand/facebook.png' },
  { name: 'hatenabookmark', displayName: 'Hatena', icon: '/assets/brand/hatenabookmark.png' },
  { name: 'linkedin', displayName: 'LinkedIn', icon: '/assets/brand/linkedin.png' },
  { name: 'threads', displayName: 'Threads', icon: '/assets/brand/threads.png' },
  { name: 'whatsapp', displayName: 'WhatsApp', icon: '/assets/brand/whatsapp.png' }
])

const handleImageError = (event) => {
  // Fallback to other.png if service icon is not found
  event.target.src = '/assets/brand/other.png'
}
</script>
