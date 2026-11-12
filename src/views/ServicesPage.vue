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

      <div class="bg-white rounded-lg shadow-xs border border-gray-200 p-6">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="service in fediverseServices" :key="service.name" class="flex items-center p-3 rounded-lg hover:bg-gray-50">
            <div class="shrink-0">
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

      <div class="bg-white rounded-lg shadow-xs border border-gray-200 p-6">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="service in traditionalServices" :key="service.name" class="flex items-center p-3 rounded-lg hover:bg-gray-50">
            <div class="shrink-0">
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

    <p class="text-gray-600 mb-6">
        {{ $t('services.more') }}
    </p>

    <!-- Additional Information -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div class="flex">
        <div class="shrink-0">
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

    <!-- License & Attribution（旧 /license。/license からはここへリダイレクトする） -->
    <section id="license" class="mt-16 pt-12 border-t border-gray-200 scroll-mt-4">
      <h2 class="text-2xl font-bold text-gray-900">
        {{ $t('services.license.title') }}
      </h2>
      <p class="mt-2 text-sm text-gray-500">
        {{ $t('services.license.lastUpdated') }}
      </p>
      <p class="mt-4 text-gray-600">
        {{ $t('services.license.intro') }}
      </p>

      <!-- 公開ライセンスのロゴ：CC の帰属表示（作者・出典・ライセンス）をここに置く -->
      <h3 class="mt-10 text-lg font-semibold text-gray-900">
        {{ $t('services.license.openLogos.title') }}
      </h3>
      <p class="mt-2 text-gray-600">
        {{ $t('services.license.openLogos.description') }}
      </p>
      <ul class="mt-4 space-y-4">
        <li
          v-for="logo in openLicensedLogos"
          :key="logo.key"
          class="flex items-start bg-white rounded-lg border border-gray-200 p-4"
        >
          <img
            :src="logo.icon"
            :alt="logo.name"
            class="w-10 h-10 mr-4 shrink-0 object-contain"
            @error="handleImageError"
          />
          <div class="min-w-0 text-sm">
            <div class="text-base font-semibold text-gray-900">{{ logo.name }}</div>
            <p class="mt-1 text-gray-600">{{ $t(`services.license.openLogos.${logo.key}`) }}</p>
            <p class="mt-1 text-gray-600">
              {{ $t('services.license.labels.license') }}:
              <a :href="logo.licenseUrl" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">
                {{ logo.license }}
              </a>
              <span class="mx-2 text-gray-300">|</span>
              {{ $t('services.license.labels.source') }}:
              <a :href="logo.sourceUrl" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline wrap-break-word">
                {{ logo.sourceLabel }}
              </a>
            </p>
            <details v-if="logo.mitCopyright" class="mt-2 text-gray-600">
              <summary class="cursor-pointer text-blue-600 hover:text-blue-800">
                {{ $t('services.license.labels.fullText') }}
              </summary>
              <pre class="mt-2 p-3 bg-gray-50 rounded text-xs whitespace-pre-wrap">{{ logo.mitCopyright }}

{{ MIT_PERMISSION_NOTICE }}</pre>
            </details>
          </div>
        </li>
      </ul>

      <!-- 商標：一覧は上の対応サービスの配列から作る（ロゴの再掲はしない） -->
      <h3 class="mt-10 text-lg font-semibold text-gray-900">
        {{ $t('services.license.trademarks.title') }}
      </h3>
      <p class="mt-2 text-gray-600">
        {{ $t('services.license.trademarks.description') }}
      </p>
      <dl class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 text-sm">
        <div
          v-for="service in trademarkedServices"
          :key="service.name"
          class="flex justify-between gap-4 py-2 border-b border-gray-100"
        >
          <dt class="font-medium text-gray-900">{{ service.displayName }}</dt>
          <dd class="text-gray-600 text-right">{{ service.holder }}</dd>
        </div>
      </dl>
      <p class="mt-4 text-sm text-gray-600">
        {{ $t('services.license.trademarks.others') }}
      </p>

      <!-- AnyPost 自身のライセンス -->
      <h3 class="mt-10 text-lg font-semibold text-gray-900">
        {{ $t('services.license.sourceCode.title') }}
      </h3>
      <p class="mt-2 text-gray-600">
        {{ $t('services.license.sourceCode.description') }}
        <a
          href="https://github.com/highemerly/anypost-web"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:text-blue-800 underline"
        >
          {{ $t('services.license.sourceCode.link') }}
        </a>
      </p>
    </section>

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
// holder: 商標の権利者。下の「商標」の一覧はここから作る。
// 企業などの権利者がはっきりしないオープンソースのプロジェクトは書かず、一覧の下の一文でまとめて扱う
const fediverseServices = [
  { name: 'mastodon', displayName: 'Mastodon', icon: '/assets/brand/mastodon.png', holder: 'Mastodon gGmbH' },
  { name: 'misskey', displayName: 'Misskey', icon: '/assets/brand/misskey.png' },
  { name: 'pleroma', displayName: 'Pleroma', icon: '/assets/brand/pleroma.png' },
  { name: 'gnusocial', displayName: 'GNU social', icon: '/assets/brand/gnusocial.png' },
  { name: 'diaspora', displayName: 'diaspora*', icon: '/assets/brand/diaspora.png' },
  { name: 'friendica', displayName: 'Friendica', icon: '/assets/brand/friendica.png' },
  { name: 'lemmy', displayName: 'Lemmy', icon: '/assets/brand/lemmy.png' },
  { name: 'piefed', displayName: 'PieFed', icon: '/assets/brand/piefed.png' },
  { name: 'hubzilla', displayName: 'Hubzilla', icon: '/assets/brand/hubzilla.png' },
  { name: 'iceshrimp.net', displayName: 'Iceshrimp.NET', icon: '/assets/brand/iceshrimp.png' },
  { name: 'snac', displayName: 'snac', icon: '/assets/brand/snac.png' },
  { name: 'bluesky', displayName: 'Bluesky', icon: '/assets/brand/bluesky.png', holder: 'Bluesky Social, PBC' }
]

const traditionalServices = [
  { name: 'twitter', displayName: 'X (Twitter)', icon: '/assets/brand/twitter.png', holder: 'X Corp.' },
  { name: 'threads', displayName: 'Threads', icon: '/assets/brand/threads.png', holder: 'Meta Platforms, Inc.' },
  { name: 'facebook', displayName: 'Facebook', icon: '/assets/brand/facebook.png', holder: 'Meta Platforms, Inc.' },
  { name: 'reddit', displayName: 'Reddit', icon: '/assets/brand/reddit.png', holder: 'Reddit, Inc.' },
  { name: 'tumblr', displayName: 'Tumblr', icon: '/assets/brand/tumblr.png', holder: 'Tumblr, Inc.' },
  { name: 'linkedin', displayName: 'LinkedIn', icon: '/assets/brand/linkedin.png', holder: 'LinkedIn Corporation' },
  { name: 'line', displayName: 'LINE', icon: '/assets/brand/line.png', holder: 'LY Corporation' },
  { name: 'whatsapp', displayName: 'WhatsApp', icon: '/assets/brand/whatsapp.png', holder: 'WhatsApp LLC' },
  { name: 'telegram', displayName: 'Telegram', icon: '/assets/brand/telegram.png', holder: 'Telegram FZ-LLC' },
  { name: 'hatenabookmark', displayName: 'Hatena Bookmark', icon: '/assets/brand/hatenabookmark.png', holder: 'Hatena Co., Ltd.' },
  { name: 'taittsuu', displayName: 'タイッツー', icon: '/assets/brand/taittsuu.png', holder: 'ホクシス' },
  { name: 'pinterest', displayName: 'Pinterest', icon: '/assets/brand/pinterest.png', holder: 'Pinterest, Inc.' },
  { name: 'xing', displayName: 'XING', icon: '/assets/brand/other.png', holder: 'New Work SE' }
]

const trademarkedServices = [...fediverseServices, ...traditionalServices].filter((s) => s.holder)

// MIT License の本文（著作権表示の後に続く部分）。原文のまま載せる
const MIT_PERMISSION_NOTICE = `Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`

// 公開ライセンスのロゴ。画像を差し替えたら、出典とライセンスもここで確かめ直す
// （misskey.png は Misskey Hub の icon.png と同一。gnusocial.png は gnu.org のロゴのマーク部分。
//   iceshrimp.png は branding リポジトリの黒のマークに余白を足したもの（改変あり。CC BY-SA なので改変物も同じライセンス）。
//   hubzilla・piefed・snac は各リポジトリの画像を縮小したもの）
const openLicensedLogos = [
  {
    key: 'misskey',
    name: 'Misskey',
    icon: '/assets/brand/misskey.png',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceLabel: 'misskey-hub.net/brand-assets',
    sourceUrl: 'https://misskey-hub.net/brand-assets/'
  },
  {
    key: 'lemmy',
    name: 'Lemmy',
    icon: '/assets/brand/lemmy.png',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceLabel: 'github.com/LemmyNet/lemmy',
    sourceUrl: 'https://github.com/LemmyNet/lemmy'
  },
  {
    key: 'iceshrimp',
    name: 'Iceshrimp.NET',
    icon: '/assets/brand/iceshrimp.png',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceLabel: 'iceshrimp.dev/iceshrimp/branding',
    sourceUrl: 'https://iceshrimp.dev/iceshrimp/branding'
  },
  {
    key: 'hubzilla',
    mitCopyright: 'Copyright (c) 2019 Hubzilla Community',
    name: 'Hubzilla',
    icon: '/assets/brand/hubzilla.png',
    license: 'MIT License',
    licenseUrl: 'https://framagit.org/hubzilla/core/-/blob/master/LICENSE',
    sourceLabel: 'framagit.org/hubzilla/core',
    sourceUrl: 'https://framagit.org/hubzilla/core'
  },
  {
    key: 'piefed',
    name: 'PieFed',
    icon: '/assets/brand/piefed.png',
    license: 'AGPL-3.0',
    licenseUrl: 'https://www.gnu.org/licenses/agpl-3.0.html',
    sourceLabel: 'codeberg.org/rimu/pyfedi',
    sourceUrl: 'https://codeberg.org/rimu/pyfedi'
  },
  {
    key: 'snac',
    mitCopyright: 'Copyright (c) 2022 - 2026 grunfink et al.',
    name: 'snac',
    icon: '/assets/brand/snac.png',
    license: 'MIT License',
    licenseUrl: 'https://codeberg.org/grunfink/snac2/src/branch/master/LICENSE',
    sourceLabel: 'codeberg.org/grunfink/snac2',
    sourceUrl: 'https://codeberg.org/grunfink/snac2'
  },
  {
    key: 'gnusocial',
    name: 'GNU social',
    icon: '/assets/brand/gnusocial.png',
    license: 'CC0 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sourceLabel: 'gnu.org/graphics/social',
    sourceUrl: 'https://www.gnu.org/graphics/social'
  }
]

const handleImageError = (event) => {
  event.target.src = '/assets/brand/other.png'
}
</script>
