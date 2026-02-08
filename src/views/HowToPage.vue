<template>
  <div class="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h1 class="text-3xl font-extrabold text-gray-900">
        {{ $t('howto.title') }}
      </h1>
      <p class="mt-4 text-lg text-gray-600">
        {{ $t('howto.description') }}
      </p>
      <!-- Tech Preview Badge
      <div class="mt-4">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ $t('common.techPreview') }}
        </span>
      </div>
      -->
    </div>

    <!-- Usage Methods -->
    <div class="space-y-12 mb-16">
      <!-- Browser Usage -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="flex items-center mb-6">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
            </div>
          </div>
          <h2 class="ml-4 text-xl font-bold text-gray-900">
            {{ $t('howto.browser.title') }}
          </h2>
        </div>

        <!-- General Bookmarklet -->
        <div class="mb-8 pb-8 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            {{ $t('howto.browser.bookmarklet.title') }}
          </h3>
          <p class="text-gray-600 mb-4">
            {{ $t('howto.browser.bookmarklet.description') }}
          </p>

          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('howto.browser.bookmarklet.codeLabel') }}
            </label>
            <div class="relative">
              <textarea
                ref="bookmarkletCodeTextarea"
                :value="bookmarkletCode"
                readonly
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-mono"
              ></textarea>
              <button
                @click="copyBookmarkletCode"
                class="absolute top-2 right-2 px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {{ $t('common.copy') }}
              </button>
            </div>
          </div>

          <div class="text-sm text-gray-600">
            <p class="mb-2">{{ $t('howto.browser.bookmarklet.steps.step1') }}</p>
            <p class="mb-2">{{ $t('howto.browser.bookmarklet.steps.step2') }}</p>
            <p>{{ $t('howto.browser.bookmarklet.steps.step3') }}</p>
          </div>
        </div>

        <!-- Server-specific Bookmarklet -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            {{ $t('howto.browser.serverSpecific.title') }}
          </h3>
          <p class="text-gray-600 mb-4">
            {{ $t('howto.browser.serverSpecific.description') }}
          </p>

          <div class="mb-4">
            <label for="server-input" class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('howto.browser.serverSpecific.serverLabel') }}
            </label>
            <input
              id="server-input"
              v-model="customServerName"
              type="text"
              :placeholder="$t('howto.browser.serverSpecific.serverPlaceholder')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              @input="updateCustomBookmarklet"
            />
          </div>

          <div v-if="customServerName.trim()" class="bg-gray-50 rounded-lg p-4 mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('howto.browser.serverSpecific.codeLabel') }}
            </label>
            <div class="relative">
              <textarea
                ref="customBookmarkletCodeTextarea"
                :value="customBookmarkletCode"
                readonly
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-mono"
              ></textarea>
              <button
                @click="copyCustomBookmarkletCode"
                class="absolute top-2 right-2 px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {{ $t('common.copy') }}
              </button>
            </div>
          </div>

          <div class="text-sm text-gray-600">
            <p class="mb-2">{{ $t('howto.browser.serverSpecific.benefit1') }}</p>
            <p>{{ $t('howto.browser.serverSpecific.benefit2') }}</p>
          </div>
        </div>
      </div>

      <!-- Website Integration - Simple -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="flex items-center mb-6">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m-4 4l4 4-4 4" />
              </svg>
            </div>
          </div>
          <h2 class="ml-4 text-xl font-bold text-gray-900">
            {{ $t('howto.website.title') }}
          </h2>
        </div>

        <h3 class="text-lg font-semibold text-gray-800 mb-4">
          {{ $t('howto.website.shareButton.title') }}
        </h3>
        <p class="text-gray-600 mb-4">
          {{ $t('howto.website.shareButton.description') }}
        </p>

        <!-- Design Selection -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">
            {{ $t('howto.website.designSelection') }}:
          </label>
          <div class="grid grid-cols-1 gap-3">
            <div
              v-for="(design, index) in shareButtonDesigns"
              :key="index"
              @click="selectedDesign = index"
              class="p-3 border rounded-lg cursor-pointer transition-all hover:bg-gray-50"
              :class="selectedDesign === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-gray-900">{{ $t(`howto.website.designs.${design.key}.name`) }}</h4>
                  <p class="text-sm text-gray-600">{{ $t(`howto.website.designs.${design.key}.description`) }}</p>
                </div>
                <div v-html="design.code" class="ml-4"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 rounded-lg p-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('howto.website.shareButton.codeLabel') }}
          </label>
          <div class="relative">
            <textarea
              ref="shareButtonCodeTextarea"
              :value="currentShareButtonCode"
              readonly
              rows="6"
              class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-mono"
            ></textarea>
            <button
              @click="copyShareButtonCode"
              class="absolute top-2 right-2 px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {{ $t('common.copy') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Developer Section - Independent -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="flex items-center mb-6">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h2 class="ml-4 text-xl font-bold text-gray-900">
            {{ $t('howto.website.customButton.title') }}
          </h2>
        </div>

        <p class="text-gray-600 mb-6">
          {{ $t('howto.website.customButton.description') }}
        </p>

        <!-- Query Parameters Table -->
        <div class="overflow-x-auto mb-6">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ $t('howto.developer.table.parameter') }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ $t('howto.developer.table.description') }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ $t('howto.developer.table.example') }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="param in queryParameters" :key="param.name">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                  {{ param.name }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ $t(`howto.developer.parameters.${param.key}`) }}
                </td>
                <td class="px-6 py-4 text-sm font-mono text-gray-500">
                  {{ param.example }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Sample URLs -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            {{ $t('howto.developer.samples.title') }}
          </h3>
          <div class="space-y-3">
            <div v-for="(sample, index) in sampleUrls" :key="index">
              <p class="text-sm font-medium text-gray-700 mb-1">{{ sample.title }}</p>
              <div class="relative">
                <code class="block p-3 bg-white border border-gray-200 rounded text-sm break-all">
                  {{ sample.url }}
                </code>
                <button
                  @click="copySampleUrl(sample.url)"
                  class="absolute top-2 right-2 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {{ $t('common.copy') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Notes Section -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 class="text-sm font-semibold text-blue-900 mb-3">
            {{ $t('howto.developer.notes.title') }}
          </h4>
          <ul class="text-sm text-blue-800 space-y-2">
            <li>{{ $t('howto.developer.notes.optional') }}</li>
            <li>{{ $t('howto.developer.notes.compatibility') }} {{ $t('howto.developer.notes.mastodonExample') }}</li>
            <li>{{ $t('howto.developer.notes.visibility') }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Developer Section - Removed as it's now integrated into Website Integration -->

    <!-- CTA Section -->
    <div class="mt-12 text-center">
      <router-link
        to="/share"
        class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        {{ $t('top.hero.cta') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()

const currentHost = computed(() => {
  return window.location.host === 'localhost:8080' ? 'http://localhost:8080' : 'https://anypost.dev'
})

const bookmarkletCode = computed(() => {
  const host = currentHost.value
  return `javascript:window.open('${host}/share?s='+encodeURIComponent(location.href)+'&t='+encodeURIComponent(document.title), '', 'width=500,height=750')`
})

// Custom server bookmarklet
const customServerName = ref('')

const customBookmarkletCode = computed(() => {
  if (!customServerName.value.trim()) return ''

  const host = currentHost.value
  const serverName = customServerName.value.trim().replace(/^https?:\/\//, '').replace(/\/$/, '')
  return `javascript:window.open('${host}/share?s='+encodeURIComponent(location.href)+'&t='+encodeURIComponent(document.title)+'&i=${encodeURIComponent(serverName)}', '', 'width=500,height=750')`
})

const updateCustomBookmarklet = () => {
  // This is called when the input changes - the computed property handles the update
}

const shareButtonDesigns = computed(() => {
  const host = currentHost.value
  return [
    {
      key: 'defaultBlue',
      code: `<div style="background: #357AFF; width: 130px; height: 45px; display: inline-block; padding: 6px; margin: 4px 6px; border-radius: 5px; text-align: center; line-height: 7px; font-family: Avenir, Helvetica,Arial,sans-serif;"><a href="${host}/share" onclick="window.open(this.href+'?s='+location.href+'&t='+document.title, '', 'width=500,height=750'); return false;" style="color: #ffffff; text-decoration-line: none;"><div style="font-size: 25px; display: flex; align-items: center; justify-content: center;"><img src="https://anypost.dev/external-assets/share.svg" width="25" style="padding-right: 4px" alt="share">Share</div><div style="font-size: 12.5px; display: flex; align-items: center; justify-content: center; padding-top: 4px">via anypost.dev</div></a></div>`
    },
    {
      key: 'modernGradient',
      code: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width: 140px; height: 50px; display: inline-block; padding: 8px; margin: 4px 6px; border-radius: 8px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"><a href="${host}/share" onclick="window.open(this.href+'?s='+location.href+'&t='+document.title, '', 'width=500,height=750'); return false;" style="color: #ffffff; text-decoration: none; display: flex; flex-direction: column; justify-content: center; height: 100%;"><div style="font-size: 18px; font-weight: 600; display: flex; align-items: center; justify-content: center; margin-bottom: 2px;"><img src="https://anypost.dev/external-assets/share.svg" width="20" style="margin-right: 6px" alt="share">Share</div><div style="font-size: 11px; opacity: 0.9;">via anypost.dev</div></a></div>`
    },
    {
      key: 'orangeEnergy',
      code: `<div style="background: linear-gradient(45deg, #ed8936 0%, #f56500 100%); width: 125px; height: 44px; display: inline-block; padding: 6px; margin: 4px 6px; border-radius: 12px; text-align: center; box-shadow: 0 3px 10px rgba(237, 137, 54, 0.4); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"><a href="${host}/share" onclick="window.open(this.href+'?s='+location.href+'&t='+document.title, '', 'width=500,height=750'); return false;" style="color: #ffffff; text-decoration: none; display: flex; flex-direction: column; justify-content: center; height: 100%;"><div style="font-size: 16px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-bottom: 1px;"><img src="https://anypost.dev/external-assets/share.svg" width="17" style="margin-right: 4px" alt="share">Share</div><div style="font-size: 10px; opacity: 0.95;">anypost.dev</div></a></div>`
    },
    {
      key: 'minimalDark',
      code: `<div style="background: #2d3748; width: 100px; height: 35px; display: inline-block; padding: 4px; margin: 4px 6px; border-radius: 4px; text-align: center; border: 1px solid #4a5568; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"><a href="${host}/share" onclick="window.open(this.href+'?s='+location.href+'&t='+document.title, '', 'width=500,height=750'); return false;" style="color: #e2e8f0; text-decoration: none; display: flex; align-items: center; justify-content: center; height: 100%;"><svg width="14" height="14" style="margin-right: 6px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg><span style="font-size: 14px; font-weight: 500;">Share</span></a></div>`
    },
    {
      key: 'popPink',
      code: `<div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); width: 110px; height: 40px; display: inline-block; padding: 5px; margin: 4px 6px; border-radius: 20px; text-align: center; box-shadow: 0 3px 12px rgba(240, 147, 251, 0.4); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"><a href="${host}/share" onclick="window.open(this.href+'?s='+location.href+'&t='+document.title, '', 'width=500,height=750'); return false;" style="color: #ffffff; text-decoration: none; display: flex; align-items: center; justify-content: center; height: 100%;"><svg width="16" height="16" style="margin-right: 6px;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg><span style="font-size: 15px; font-weight: 600;">Share</span></a></div>`
    },
    {
      key: 'techNavy',
      code: `<div style="background: #1a202c; width: 95px; height: 32px; display: inline-block; padding: 3px; margin: 4px 6px; border-radius: 0; text-align: center; border: 1px solid #2d3748; font-family: 'Courier New', monospace;"><a href="${host}/share" onclick="window.open(this.href+'?s='+location.href+'&t='+document.title, '', 'width=500,height=750'); return false;" style="color: #68d391; text-decoration: none; display: flex; align-items: center; justify-content: center; height: 100%;"><svg width="12" height="12" style="margin-right: 4px;" fill="currentColor" viewBox="0 0 24 24"><path d="M8.5 8.5L11 6.5L19 14.5L11 22.5L8.5 20.5L14 15H2V13H14L8.5 8.5Z"></path></svg><span style="font-size: 12px; font-weight: 600;">POST</span></a></div>`
    }
  ]
})

const selectedDesign = ref(0)

const currentShareButtonCode = computed(() => {
  return shareButtonDesigns.value[selectedDesign.value].code
})

const queryParameters = ref([
  { name: 't', key: 'text', example: 'Hello World' },
  { name: 's', key: 'url', example: 'https://example.com' },
  { name: 'i', key: 'instance', example: 'mastodon.social' },
  { name: 'v', key: 'visibility', example: 'public' },
  { name: 'h', key: 'hashtag', example: 'anypost' },
  { name: 'a', key: 'autoRedirect', example: '1' }
])

const sampleUrls = computed(() => {
  const host = currentHost.value
  return [
    {
      title: $t('howto.developer.samples.basic'),
      url: `${host}/share?t=anypost%20can%20share%20to%20anywhere!&s=https://example.com/`
    },
    {
      title: $t('howto.developer.samples.withInstance'),
      url: `${host}/share?t=anypost%20can%20share%20to%20anywhere!&s=https://example.com/&v=unlisted&i=mastodon.social`
    },
    {
      title: $t('howto.developer.samples.autoRedirect'),
      url: `${host}/share?t=Hello%20AnyPost!&s=https://anypost.dev&i=mstdn.jp&a=1`
    }
  ]
})

// Copy functions
const copyBookmarkletCode = async () => {
  try {
    await navigator.clipboard.writeText(bookmarkletCode.value)
    alert($t('common.copied'))
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

const copyShareButtonCode = async () => {
  try {
    await navigator.clipboard.writeText(currentShareButtonCode.value)
    alert($t('common.copied'))
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

const copyCustomBookmarkletCode = async () => {
  try {
    await navigator.clipboard.writeText(customBookmarkletCode.value)
    alert($t('common.copied'))
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

const copySampleUrl = async (url) => {
  try {
    await navigator.clipboard.writeText(url)
    alert($t('common.copied'))
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}
</script>
