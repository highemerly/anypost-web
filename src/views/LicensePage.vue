<template>
  <div class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <article class="prose prose-lg max-w-none">
      <h1>{{ $t('license.title') }}</h1>

      <p class="text-sm text-gray-500 mb-8">
        {{ $t('license.lastUpdated') }}
      </p>

      <p class="lead">
        {{ $t('license.intro') }}
      </p>

      <h2>{{ $t('license.ccLogos.title') }}</h2>

      <div class="space-y-6">
        <!-- Misskey -->
        <div class="bg-gray-50 rounded-lg p-6">
          <div class="flex items-center mb-4">
            <img
              src="/assets/brand/misskey.png"
              alt="Misskey logo"
              class="w-12 h-12 mr-4"
              @error="handleImageError"
            />
            <h3 class="text-lg font-semibold text-gray-900 mb-0">Misskey</h3>
          </div>
          <p class="mb-2">
            {{ $t('license.ccLogos.misskey.description') }}
          </p>
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 underline font-medium"
          >
            CC BY-NC-SA 4.0
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <!-- GNU social -->
        <div class="bg-gray-50 rounded-lg p-6">
          <div class="flex items-center mb-4">
            <img
              src="/assets/brand/gnusocial.png"
              alt="GNU social logo"
              class="w-12 h-12 mr-4"
              @error="handleImageError"
            />
            <h3 class="text-lg font-semibold text-gray-900 mb-0">GNU social</h3>
          </div>
          <p class="mb-2">
            {{ $t('license.ccLogos.gnusocial.description') }}
          </p>
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 underline font-medium"
          >
            CC BY-SA 4.0
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <!-- Lemmy -->
        <div class="bg-gray-50 rounded-lg p-6">
          <div class="flex items-center mb-4">
            <img
              src="/assets/brand/lemmy.png"
              alt="Lemmy logo"
              class="w-12 h-12 mr-4"
              @error="handleImageError"
            />
            <h3 class="text-lg font-semibold text-gray-900 mb-0">Lemmy</h3>
          </div>
          <p class="mb-2">
            {{ $t('license.ccLogos.lemmy.description') }}
          </p>
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 underline font-medium"
          >
            CC BY-SA 4.0
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      <div class="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 class="text-lg font-semibold text-blue-900 mb-2">{{ $t('license.creativeCommons.title') }}</h3>
        <p class="text-blue-800">
          {{ $t('license.creativeCommons.description') }}
        </p>
        <a
          href="https://creativecommons.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 underline font-medium"
        >
          creativecommons.org
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <h2 class="mt-20">{{ $t('license.trademarks.title') }}</h2>

      <p class="mb-6">
        {{ $t('license.trademarks.description') }}
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
        <div
          v-for="tm in trademarks"
          :key="tm.name"
          class="flex items-center bg-gray-50 rounded-lg p-4"
        >
          <img
            :src="tm.icon"
            :alt="tm.name + ' logo'"
            class="w-10 h-10 mr-3 shrink-0"
            @error="handleImageError"
          />
          <div class="min-w-0">
            <div class="font-semibold text-gray-900 truncate">{{ tm.name }}</div>
            <div class="text-sm text-gray-600 truncate">{{ tm.holder }}</div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()

const trademarks = [
  { name: 'X (Twitter)', holder: 'X Corp.', icon: '/assets/brand/twitter.png' },
  { name: 'Facebook', holder: 'Meta Platforms, Inc.', icon: '/assets/brand/facebook.png' },
  { name: 'LinkedIn', holder: 'Microsoft Corporation', icon: '/assets/brand/linkedin.png' },
  { name: 'LINE', holder: 'LY Corporation', icon: '/assets/brand/line.png' },
  { name: 'Hatena Bookmark', holder: 'Hatena Co., Ltd.', icon: '/assets/brand/hatenabookmark.png' },
  { name: 'Pinterest', holder: 'Pinterest, Inc.', icon: '/assets/brand/pinterest.png' },
  { name: 'Pocket', holder: 'Mozilla Corporation', icon: '/assets/brand/pocket.png' },
  { name: 'Mastodon', holder: 'Mastodon gGmbH', icon: '/assets/brand/mastodon.png' },
  { name: 'Pleroma', holder: 'Pleroma contributors', icon: '/assets/brand/pleroma.png' },
  { name: 'diaspora*', holder: 'The Diaspora Foundation', icon: '/assets/brand/diaspora.png' },
  { name: 'Friendica', holder: 'Friendica contributors', icon: '/assets/brand/friendica.png' },
  { name: 'Reddit', holder: 'Reddit, Inc.', icon: '/assets/brand/reddit.png' },
  { name: 'Bluesky', holder: 'Bluesky Social, PBC', icon: '/assets/brand/bluesky.png' },
  { name: 'WhatsApp', holder: 'Meta Platforms, Inc.', icon: '/assets/brand/whatsapp.png' },
  { name: 'Telegram', holder: 'Telegram FZ-LLC', icon: '/assets/brand/telegram.png' },
  { name: 'Threads', holder: 'Meta Platforms, Inc.', icon: '/assets/brand/threads.png' }
]

const handleImageError = (event) => {
  event.target.src = '/assets/brand/other.png'
}
</script>
