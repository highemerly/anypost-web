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
          <div class="shrink-0">
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

        <!-- Server-specific Bookmarklet -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            {{ $t('howto.browser.serverSpecific.title') }}
          </h3>
          <p class="text-gray-600 mb-4">
            {{ $t('howto.browser.serverSpecific.description') }}
          </p>

          <div class="mb-4">
            <div class="flex items-baseline justify-between mb-2">
              <label for="server-input" class="block text-sm font-medium text-gray-700">
                {{ $t('howto.browser.serverSpecific.serverLabel') }}
              </label>
              <router-link to="/services" class="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 hover:underline">
                <svg class="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                {{ $t('share.viewSupportedServices') }}
              </router-link>
            </div>
            <input
              id="server-input"
              v-model="customServerName"
              type="text"
              :placeholder="$t('howto.browser.serverSpecific.serverPlaceholder')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                class="absolute top-2 right-2 px-3 py-1 text-xs bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors"
              >
                {{ $t('common.copy') }}
              </button>
            </div>
          </div>

          <div class="text-sm text-gray-600">
            <p class="mb-2">{{ $t('howto.browser.serverSpecific.steps.step1') }}</p>
            <p class="mb-2">{{ $t('howto.browser.serverSpecific.steps.step2') }}</p>
            <p class="mb-2">{{ $t('howto.browser.serverSpecific.steps.step3') }}</p>
            <p>{{ $t('howto.browser.serverSpecific.steps.step4') }}</p>
          </div>
        </div>

        <!-- OR Divider -->
        <div class="my-8 flex items-center" aria-hidden="true">
          <div class="grow border-t border-gray-200"></div>
          <span class="px-4 text-sm font-medium text-gray-500">— {{ $t('howto.browser.or') }} —</span>
          <div class="grow border-t border-gray-200"></div>
        </div>

        <!-- General Bookmarklet -->
        <div>
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
                class="absolute top-2 right-2 px-3 py-1 text-xs bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors"
              >
                {{ $t('common.copy') }}
              </button>
            </div>
          </div>

          <div class="text-sm text-gray-600">
            <p class="mb-2">{{ $t('howto.browser.bookmarklet.steps.step1') }}</p>
            <p class="mb-2">{{ $t('howto.browser.bookmarklet.steps.step2') }}</p>
            <p class="mb-2">{{ $t('howto.browser.bookmarklet.steps.step3') }}</p>
            <p>{{ $t('howto.browser.bookmarklet.steps.step4') }}</p>
          </div>
        </div>
      </div>

      <!-- Website Integration - Simple -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="flex items-center mb-6">
          <div class="shrink-0">
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
              class="absolute top-2 right-2 px-3 py-1 text-xs bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors"
            >
              {{ $t('common.copy') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Developer Section - Independent -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="flex items-center mb-6">
          <div class="shrink-0">
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
                <code class="block p-3 bg-white border border-gray-200 rounded-sm text-sm break-all">
                  {{ sample.url }}
                </code>
                <button
                  @click="copySampleUrl(sample.url)"
                  class="absolute top-2 right-2 px-2 py-1 text-xs bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors"
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
  return `javascript:window.open('${host}/share?s='+encodeURIComponent(location.href)+'&t='+encodeURIComponent(document.title)+'&i=${encodeURIComponent(serverName)}&a=1', '', 'width=500,height=750')`
})

const updateCustomBookmarklet = () => {
  // This is called when the input changes - the computed property handles the update
}

const shareButtonDesigns = computed(() => {
  const host = currentHost.value
  return [
    {
      key: 'defaultBlue',
      code: `<div style="background: #357AFF; width: 130px; height: 45px; display: inline-block; padding: 6px; margin: 4px 6px; border-radius: 5px; text-align: center; line-height: 7px; font-family: Avenir, Helvetica,Arial,sans-serif;"><a href="${host}/share" onclick="window.open(this.href+'?s='+location.href+'&t='+document.title, '', 'width=500,height=750'); return false;" style="color: #ffffff; text-decoration-line: none;"><div style="font-size: 25px; display: flex; align-items: center; justify-content: center;"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 4px; vertical-align: middle;"><path fill-rule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd"/></svg>Share</div><div style="font-size: 12.5px; display: flex; align-items: center; justify-content: center; padding-top: 4px">via anypost.dev</div></a></div>`
    },
    {
      key: 'glassMorphism',
      code: `<div style="background: rgba(255, 255, 255, 0.35); backdrop-filter: blur(12px) saturate(180%); -webkit-backdrop-filter: blur(12px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.5); width: 145px; height: 48px; display: inline-block; padding: 6px; margin: 4px 6px; border-radius: 12px; text-align: center; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"><a href="${host}/share" onclick="window.open(this.href+'?s='+location.href+'&t='+document.title, '', 'width=500,height=750'); return false;" style="color: #1a202c; text-decoration: none; display: flex; flex-direction: column; justify-content: center; height: 100%;"><div style="font-size: 15px; font-weight: 600; display: flex; align-items: center; justify-content: center; line-height: 1.1;"><svg width="14" height="14" style="margin-right: 4px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>Share</div><div style="font-size: 10.5px; opacity: 0.7; margin-top: 2px;">via anypost.dev</div></a></div>`
    },
    {
      key: 'orangeEnergy',
      code: `<div style="background: linear-gradient(45deg, #ed8936 0%, #f56500 100%); width: 125px; height: 44px; display: inline-block; padding: 6px; margin: 4px 6px; border-radius: 12px; text-align: center; box-shadow: 0 3px 10px rgba(237, 137, 54, 0.4); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"><a href="${host}/share" onclick="window.open(this.href+'?s='+location.href+'&t='+document.title, '', 'width=500,height=750'); return false;" style="color: #ffffff; text-decoration: none; display: flex; flex-direction: column; justify-content: center; height: 100%;"><div style="font-size: 16px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-bottom: 1px;"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 4px; vertical-align: middle;"><path fill-rule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd"/></svg>Share</div><div style="font-size: 10px; opacity: 0.95;">anypost.dev</div></a></div>`
    },
    {
      key: 'minimalDark',
      code: `<div style="background: #2d3748; width: 100px; height: 35px; display: inline-block; padding: 4px; margin: 4px 6px; border-radius: 4px; text-align: center; border: 1px solid #4a5568; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"><a href="${host}/share" onclick="window.open(this.href+'?s='+location.href+'&t='+document.title, '', 'width=500,height=750'); return false;" style="color: #e2e8f0; text-decoration: none; display: flex; align-items: center; justify-content: center; height: 100%;"><svg width="14" height="14" style="margin-right: 6px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg><span style="font-size: 14px; font-weight: 500;">Share</span></a></div>`
    },
    {
      key: 'purpleDynamic',
      code: `<style>@keyframes anypost-rot{0%,6%{transform:translateY(0)}7.7%,13.7%{transform:translateY(-14px)}15.4%,21.4%{transform:translateY(-28px)}23.1%,29.1%{transform:translateY(-42px)}30.8%,36.8%{transform:translateY(-56px)}38.5%,44.5%{transform:translateY(-70px)}46.2%,52.2%{transform:translateY(-84px)}53.8%,59.8%{transform:translateY(-98px)}61.5%,67.5%{transform:translateY(-112px)}69.2%,75.2%{transform:translateY(-126px)}76.9%,82.9%{transform:translateY(-140px)}84.6%,90.6%{transform:translateY(-154px)}92.3%,98.3%{transform:translateY(-168px)}100%{transform:translateY(-182px)}}</style><div style="background: linear-gradient(45deg, #6366f1 0%, #a855f7 100%); width: 145px; height: 48px; display: inline-block; padding: 6px; margin: 4px 3px; border-radius: 12px; text-align: center; box-shadow: 0 3px 10px rgba(139, 92, 246, 0.4); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"><a href="${host}/share" onclick="window.open(this.href+'?s='+location.href+'&t='+document.title, '', 'width=500,height=750'); return false;" style="color: #ffffff; text-decoration: none; display: flex; flex-direction: column; justify-content: center; height: 100%;"><div style="font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; line-height: 1.1;"><svg width="14" height="14" style="margin-right: 4px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>Share</div><div style="font-size: 11px; opacity: 0.95; display: flex; align-items: center; justify-content: center; margin-top: 2px;">→&nbsp;<span style="display: inline-block; height: 14px; overflow: hidden; vertical-align: bottom;"><span style="display: block; animation: anypost-rot 26s infinite;"><span style="display: block; height: 14px; line-height: 14px;">Mastodon</span><span style="display: block; height: 14px; line-height: 14px;">WhatsApp</span><span style="display: block; height: 14px; line-height: 14px;">X</span><span style="display: block; height: 14px; line-height: 14px;">Threads</span><span style="display: block; height: 14px; line-height: 14px;">Misskey</span><span style="display: block; height: 14px; line-height: 14px;">Reddit</span><span style="display: block; height: 14px; line-height: 14px;">Facebook</span><span style="display: block; height: 14px; line-height: 14px;">Pleroma</span><span style="display: block; height: 14px; line-height: 14px;">Telegram</span><span style="display: block; height: 14px; line-height: 14px;">Lemmy</span><span style="display: block; height: 14px; line-height: 14px;">LINE</span><span style="display: block; height: 14px; line-height: 14px;">Bluesky</span><span style="display: block; height: 14px; line-height: 14px;">diaspora</span><span style="display: block; height: 14px; line-height: 14px;">Mastodon</span></span></span></div></a></div>`
    },
    {
      key: 'socialIcons',
      code: `<div style="background: #ffffff; width: 100px; height: 44px; display: inline-block; padding: 4px 4px; margin: 4px 6px; border-radius: 8px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.12); border: 1px solid #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; box-sizing: border-box;"><a href="${host}/share" onclick="window.open(this.href+'?s='+location.href+'&t='+document.title, '', 'width=500,height=750'); return false;" style="color: #1a202c; text-decoration: none; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;"><div style="font-size: 11px; font-weight: 600; margin-bottom: 2px;">Share!</div><div style="display: flex; align-items: center; justify-content: center; gap: 5px;"><svg width="13" height="13" viewBox="0 0 24 24" fill="#1a202c" style="vertical-align: middle;"><path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/></svg><svg width="13" height="13" viewBox="0 0 24 24" fill="#1a202c" style="vertical-align: middle;"><path d="M8.91076 16.8915c-1.03957.0038-1.93213-.6294-2.35267-1.366-.22516-.3217-.66989-.4364-.6761 0v2.0148c0 .8094-.29152 1.5097-.87581 2.1002-.56755.573-1.25977.8595-2.0779.8595-.80014 0-1.49298-.2865-2.07727-.8601C.28408 19.05 0 18.3497 0 17.5403V6.45968c0-.62378.17553-1.18863.52599-1.69455.36657-.52284.83426-.88582 1.4018-1.08769a2.84574 2.84574 0 0 1 1.00049-.17742c.90125 0 1.65239.35421 2.25281 1.06262l2.99713 3.51572c.06699.05016.263.43696.73192.43696.47016 0 .6916-.3868.75796-.43758l2.9717-3.5151c.6178-.70841 1.377-1.06262 2.2782-1.06262.3337 0 .6675.05893 1.0012.17742.5669.20187 1.0259.56422 1.377 1.08769.3665.50592.5501 1.07077.5501 1.69455V17.5403c0 .8094-.2915 1.5097-.8758 2.1002-.5675.573-1.2604.8595-2.0779.8595-.8008 0-1.493-.2865-2.0779-.8601-.5669-.5899-.8504-1.2902-.8504-2.0996v-2.0148c-.0496-.5499-.5303-.2032-.7009 0-.4503.8431-1.31369 1.3616-2.35264 1.366ZM21.447 8.60998c-.7009 0-1.3015-.24449-1.8019-.73348-.4838-.50571-.7257-1.11277-.7257-1.82118s.2419-1.30711.7257-1.79611c.5004-.50571 1.101-.75856 1.8019-.75856.7009 0 1.3017.25285 1.8025.75856.5003.489.7505 1.0877.7505 1.79611 0 .70841-.2502 1.31547-.7505 1.82118-.5008.48899-1.1016.73348-1.8025.73348Zm.0248.50655c.7009 0 1.2935.25285 1.7777.75856.5003.50571.7505 1.11301.7505 1.82181v6.2484c0 .7084-.2502 1.3155-.7505 1.8212-.4838.489-1.0764.7335-1.7777.7335-.7005 0-1.3011-.2445-1.8019-.7335-.5003-.5057-.7505-1.1128-.7505-1.8212v-6.2484c0-.7084.2502-1.3157.7505-1.82181.5004-.50571 1.101-.75856 1.8019-.75856Z"/></svg><svg width="13" height="13" viewBox="0 0 24 24" fill="#1a202c" style="vertical-align: middle;"><path d="M6 0v24h6V12.017h6V0H6zm12 12.012v12h6v-12h-6z"/></svg><span style="font-size: 13px; font-weight: 700; color: #1a202c; margin-left: 1px;">+</span></div></a></div>`
    },
    {
      key: 'socialIconsDark',
      code: `<div style="background: #1a202c; width: 100px; height: 44px; display: inline-block; padding: 4px 4px; margin: 4px 6px; border-radius: 8px; text-align: center; box-shadow: 0 3px 10px rgba(0,0,0,0.25); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; box-sizing: border-box;"><a href="${host}/share" onclick="window.open(this.href+'?s='+location.href+'&t='+document.title, '', 'width=500,height=750'); return false;" style="color: #ffffff; text-decoration: none; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;"><div style="font-size: 11px; font-weight: 600; margin-bottom: 2px;">Share!</div><div style="display: flex; align-items: center; justify-content: center; gap: 5px;"><svg width="13" height="13" viewBox="0 0 24 24" fill="#ffffff" style="vertical-align: middle;"><path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/></svg><svg width="13" height="13" viewBox="0 0 24 24" fill="#ffffff" style="vertical-align: middle;"><path d="M8.91076 16.8915c-1.03957.0038-1.93213-.6294-2.35267-1.366-.22516-.3217-.66989-.4364-.6761 0v2.0148c0 .8094-.29152 1.5097-.87581 2.1002-.56755.573-1.25977.8595-2.0779.8595-.80014 0-1.49298-.2865-2.07727-.8601C.28408 19.05 0 18.3497 0 17.5403V6.45968c0-.62378.17553-1.18863.52599-1.69455.36657-.52284.83426-.88582 1.4018-1.08769a2.84574 2.84574 0 0 1 1.00049-.17742c.90125 0 1.65239.35421 2.25281 1.06262l2.99713 3.51572c.06699.05016.263.43696.73192.43696.47016 0 .6916-.3868.75796-.43758l2.9717-3.5151c.6178-.70841 1.377-1.06262 2.2782-1.06262.3337 0 .6675.05893 1.0012.17742.5669.20187 1.0259.56422 1.377 1.08769.3665.50592.5501 1.07077.5501 1.69455V17.5403c0 .8094-.2915 1.5097-.8758 2.1002-.5675.573-1.2604.8595-2.0779.8595-.8008 0-1.493-.2865-2.0779-.8601-.5669-.5899-.8504-1.2902-.8504-2.0996v-2.0148c-.0496-.5499-.5303-.2032-.7009 0-.4503.8431-1.31369 1.3616-2.35264 1.366ZM21.447 8.60998c-.7009 0-1.3015-.24449-1.8019-.73348-.4838-.50571-.7257-1.11277-.7257-1.82118s.2419-1.30711.7257-1.79611c.5004-.50571 1.101-.75856 1.8019-.75856.7009 0 1.3017.25285 1.8025.75856.5003.489.7505 1.0877.7505 1.79611 0 .70841-.2502 1.31547-.7505 1.82118-.5008.48899-1.1016.73348-1.8025.73348Zm.0248.50655c.7009 0 1.2935.25285 1.7777.75856.5003.50571.7505 1.11301.7505 1.82181v6.2484c0 .7084-.2502 1.3155-.7505 1.8212-.4838.489-1.0764.7335-1.7777.7335-.7005 0-1.3011-.2445-1.8019-.7335-.5003-.5057-.7505-1.1128-.7505-1.8212v-6.2484c0-.7084.2502-1.3157.7505-1.82181.5004-.50571 1.101-.75856 1.8019-.75856Z"/></svg><svg width="13" height="13" viewBox="0 0 24 24" fill="#ffffff" style="vertical-align: middle;"><path d="M6 0v24h6V12.017h6V0H6zm12 12.012v12h6v-12h-6z"/></svg><span style="font-size: 13px; font-weight: 700; color: #ffffff; margin-left: 1px;">+</span></div></a></div>`
    },
    {
      key: 'socialIconsRow',
      code: `<div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); width: 222px; height: 38px; display: inline-block; padding: 4px 12px; margin: 4px 6px; border-radius: 20px; text-align: center; box-shadow: 0 3px 12px rgba(240, 147, 251, 0.4); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; box-sizing: border-box;"><a href="${host}/share" onclick="window.open(this.href+'?s='+location.href+'&t='+document.title, '', 'width=500,height=750'); return false;" style="color: #ffffff; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px; height: 100%;"><svg width="14" height="14" fill="none" stroke="#ffffff" viewBox="0 0 24 24" style="vertical-align: middle;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg><svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" style="vertical-align: middle;"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg><svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" style="vertical-align: middle;"><path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/></svg><svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" style="vertical-align: middle;"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg><svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" style="vertical-align: middle;"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.296 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/></svg><svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" style="vertical-align: middle;"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.32.143 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/></svg><svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" style="vertical-align: middle;"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.711.307 1.265.49 1.697.628.713.226 1.361.194 1.874.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg></a></div>`
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
