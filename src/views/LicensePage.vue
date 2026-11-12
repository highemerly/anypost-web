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
        <div v-for="logo in ccLogos" :key="logo.key" class="bg-gray-50 rounded-lg p-6">
          <div class="flex items-center mb-4">
            <img
              :src="logo.icon"
              :alt="logo.name + ' logo'"
              class="w-12 h-12 mr-4"
              @error="handleImageError"
            />
            <h3 class="text-lg font-semibold text-gray-900 mb-0">{{ logo.name }}</h3>
          </div>
          <p class="mb-2">
            {{ $t(`license.ccLogos.${logo.key}.description`) }}
          </p>
          <a
            :href="logo.licenseUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 underline font-medium"
          >
            {{ logo.license }}
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

      <h2 class="mt-20">{{ $t('license.ossLogos.title') }}</h2>

      <p class="mb-6">
        {{ $t('license.ossLogos.description') }}
      </p>

      <div class="space-y-6">
        <div v-for="logo in ossLogos" :key="logo.key" class="bg-gray-50 rounded-lg p-6">
          <div class="flex items-center mb-4">
            <img
              :src="logo.icon"
              :alt="logo.name + ' logo'"
              class="w-12 h-12 mr-4"
              @error="handleImageError"
            />
            <h3 class="text-lg font-semibold text-gray-900 mb-0">{{ logo.name }}</h3>
          </div>
          <p class="mb-2">
            {{ $t(`license.ossLogos.${logo.key}.description`) }}
          </p>
          <a
            :href="logo.licenseUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 underline font-medium"
          >
            {{ logo.license }}
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
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

const CC_BY_SA = { license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' }

const ccLogos = [
  { key: 'misskey', name: 'Misskey', icon: '/assets/brand/misskey.png', license: 'CC BY-NC-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/' },
  { key: 'gnusocial', name: 'GNU social', icon: '/assets/brand/gnusocial.png', ...CC_BY_SA },
  { key: 'lemmy', name: 'Lemmy', icon: '/assets/brand/lemmy.png', ...CC_BY_SA },
  { key: 'iceshrimp', name: 'Iceshrimp', icon: '/assets/brand/iceshrimp.png', ...CC_BY_SA }
]

// Logos shipped in the projects' source repositories, under the repositories' licenses
const ossLogos = [
  { key: 'hubzilla', name: 'Hubzilla', icon: '/assets/brand/hubzilla.png', license: 'MIT License', licenseUrl: 'https://framagit.org/hubzilla/core/-/blob/master/LICENSE' },
  { key: 'piefed', name: 'PieFed', icon: '/assets/brand/piefed.png', license: 'AGPL-3.0', licenseUrl: 'https://codeberg.org/rimu/pyfedi/src/branch/main/LICENSE' },
  { key: 'snac', name: 'snac', icon: '/assets/brand/snac.png', license: 'MIT License', licenseUrl: 'https://codeberg.org/grunfink/snac2/src/branch/master/LICENSE' }
]

const trademarks = [
  { name: 'X (Twitter)', holder: 'X Corp.', icon: '/assets/brand/twitter.png' },
  { name: 'Facebook', holder: 'Meta Platforms, Inc.', icon: '/assets/brand/facebook.png' },
  { name: 'LinkedIn', holder: 'Microsoft Corporation', icon: '/assets/brand/linkedin.png' },
  { name: 'LINE', holder: 'LY Corporation', icon: '/assets/brand/line.png' },
  { name: 'Hatena Bookmark', holder: 'Hatena Co., Ltd.', icon: '/assets/brand/hatenabookmark.png' },
  { name: 'Pinterest', holder: 'Pinterest, Inc.', icon: '/assets/brand/pinterest.png' },
  { name: 'Mastodon', holder: 'Mastodon gGmbH', icon: '/assets/brand/mastodon.png' },
  { name: 'Pleroma', holder: 'Pleroma contributors', icon: '/assets/brand/pleroma.png' },
  { name: 'diaspora*', holder: 'The Diaspora Foundation', icon: '/assets/brand/diaspora.png' },
  { name: 'Friendica', holder: 'Friendica contributors', icon: '/assets/brand/friendica.png' },
  { name: 'Reddit', holder: 'Reddit, Inc.', icon: '/assets/brand/reddit.png' },
  { name: 'Bluesky', holder: 'Bluesky Social, PBC', icon: '/assets/brand/bluesky.png' },
  { name: 'WhatsApp', holder: 'Meta Platforms, Inc.', icon: '/assets/brand/whatsapp.png' },
  { name: 'Telegram', holder: 'Telegram FZ-LLC', icon: '/assets/brand/telegram.png' },
  { name: 'Threads', holder: 'Meta Platforms, Inc.', icon: '/assets/brand/threads.png' },
  { name: 'Tumblr', holder: 'Tumblr, Inc.', icon: '/assets/brand/tumblr.png' },
  { name: 'タイッツー (Taittsuu)', holder: 'タイッツー', icon: '/assets/brand/taittsuu.png' }
]

const handleImageError = (event) => {
  event.target.src = '/assets/brand/other.png'
}
</script>
