<template>
  <div class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h1 class="text-3xl font-extrabold text-gray-900">
        {{ $t('services.title') }}
      </h1>
      <p class="mt-4 text-lg text-gray-600">
        {{ $t('services.description') }}
      </p>
    </div>

    <!-- Fediverse Services -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">
        {{ $t('services.fediverse.title') }}
      </h2>
      <p class="text-gray-600 mb-6">
        {{ $t('services.fediverse.description') }}
      </p>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="service in fediverseServices" :key="service.name" class="flex items-center p-3 rounded-lg hover:bg-gray-50">
            <div class="flex-shrink-0">
              <img
                :src="service.icon"
                :alt="service.name"
                class="w-8 h-8 object-contain"
                @error="handleImageError"
              />
            </div>
            <div class="ml-3">
              <h3 class="text-base font-medium text-gray-900">{{ service.displayName }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Traditional Services -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">
        {{ $t('services.traditional.title') }}
      </h2>
      <p class="text-gray-600 mb-6">
        {{ $t('services.traditional.description') }}
      </p>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="service in traditionalServices" :key="service.name" class="flex items-center p-3 rounded-lg hover:bg-gray-50">
            <div class="flex-shrink-0">
              <img
                :src="service.icon"
                :alt="service.name"
                class="w-8 h-8 object-contain"
                @error="handleImageError"
              />
            </div>
            <div class="ml-3">
              <h3 class="text-base font-medium text-gray-900">{{ service.displayName }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Information -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-blue-800">
            {{ $t('services.info.title') }}
          </h3>
          <div class="mt-2 text-sm text-blue-700">
            <p>{{ $t('services.info.description') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to Top Button -->
    <div class="mt-12 text-center">
      <router-link
        to="/"
        class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        {{ $t('services.backToTop') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Fediverse services
const fediverseServices = ref([
  { name: 'mastodon', displayName: 'Mastodon', icon: '/assets/brand/mastodon.png' },
  { name: 'misskey', displayName: 'Misskey', icon: '/assets/brand/misskey.png' },
  { name: 'pleroma', displayName: 'Pleroma', icon: '/assets/brand/pleroma.png' },
  { name: 'gnusocial', displayName: 'GNU social', icon: '/assets/brand/gnusocial.png' },
  { name: 'diaspora', displayName: 'Diaspora', icon: '/assets/brand/diaspora.png' },
  { name: 'friendica', displayName: 'Friendica', icon: '/assets/brand/friendica.png' }
])

// Traditional services
const traditionalServices = ref([
  { name: 'twitter', displayName: 'X (Twitter)', icon: '/assets/brand/twitter.png' },
  { name: 'facebook', displayName: 'Facebook', icon: '/assets/brand/facebook.png' },
  { name: 'linkedin', displayName: 'LinkedIn', icon: '/assets/brand/linkedin.png' },
  { name: 'line', displayName: 'LINE', icon: '/assets/brand/line.png' },
  { name: 'hatenabookmark', displayName: 'Hatena Bookmark', icon: '/assets/brand/hatenabookmark.png' },
  { name: 'pinterest', displayName: 'Pinterest', icon: '/assets/brand/pinterest.png' },
  { name: 'xing', displayName: 'XING', icon: '/assets/brand/other.png' }
])

const handleImageError = (event) => {
  event.target.src = '/assets/brand/other.png'
}
</script>
