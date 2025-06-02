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

      <h2>{{ $t('license.logos.title') }}</h2>

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
            {{ $t('license.logos.misskey.description') }}
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
            {{ $t('license.logos.gnusocial.description') }}
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
        <h3 class="text-lg font-semibold text-blue-900 mb-2">Creative Commons について / About Creative Commons</h3>
        <p class="text-blue-800 mb-4">
          Creative Commons は、クリエイティブな作品の共有を促進するライセンス体系です。詳細については公式サイトをご確認ください。
        </p>
        <p class="text-blue-800">
          Creative Commons is a licensing system that promotes sharing of creative works. For more details, please check the official website.
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
    </article>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()

const handleImageError = (event) => {
  // Fallback to other.png if logo is not found
  event.target.src = '/assets/brand/other.png'
}
</script>
