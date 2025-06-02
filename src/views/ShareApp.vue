<template>
  <div class="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <!-- Auto-redirect Modal -->
    <div v-if="autoRedirect && countdown > 0" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
        <div class="mb-4">
          <svg class="h-16 w-16 text-blue-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          {{ $t('share.autoRedirectTitle') }}
        </h3>
        <p class="text-sm text-gray-600 mb-4">
          {{ countdown }}{{ $t('share.autoRedirectMessage') }}
        </p>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-blue-600 h-2 rounded-full transition-all duration-1000" :style="{ width: `${((4 - countdown) / 3) * 100}%` }"></div>
        </div>
      </div>
    </div>

    <!-- Error Modal for missing instance when auto-redirect -->
    <div v-if="showAutoRedirectError" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
        <div class="mb-4">
          <svg class="h-16 w-16 text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-red-900 mb-2">
          {{ $t('share.autoRedirectErrorTitle') }}
        </h3>
        <p class="text-sm text-red-600 mb-4">
          {{ $t('share.autoRedirectError') }}
        </p>
        <button
          @click="showAutoRedirectError = false"
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          {{ $t('share.close') }}
        </button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">
        {{ $t('share.title') }}
      </h1>
      <p class="text-gray-600 mb-8">
        {{ $t('share.subtitle') }}
      </p>

      <!-- Query Parameters Loaded Notice -->
      <div v-if="hasQueryParams" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">
              {{ $t('share.autoPostLoaded') }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Server Name Required Notice -->
      <div v-if="!formData.instanceName.trim()" class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-yellow-800">
              {{ $t('share.serverNameRequired') }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Top Submit Button -->
      <div class="mb-6">
        <button
          type="button"
          @click="handleSubmit"
          :disabled="!formData.instanceName.trim() || (instanceInfo && instanceInfo.type === 'unknown') || instanceStore.loading"
          class="w-full flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100"
        >
          <span v-if="instanceStore.loading">{{ $t('common.loading') }}</span>
          <span v-else>🚀 {{ $t('share.postButton') }}</span>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Instance Name Input with Dropdown -->
        <div>
          <label for="instance-name" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('share.instanceName') }}
          </label>
          <div class="relative">
            <!-- Dropdown -->
            <select
              v-model="selectedPresetInstance"
              @change="handlePresetSelection"
              class="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            >
              <option value="">{{ $t('share.dropdownLabel') }}</option>
              <option v-if="rememberedServer" :value="rememberedServer" class="font-semibold bg-blue-50">
                {{ rememberedServer }} ({{ $t('share.previouslyUsed') }})
              </option>
              <option value="mastodon.social">mastodon.social (Mastodon)</option>
              <option value="misskey.io">misskey.io (Misskey)</option>
              <option value="x.com">x.com (Twitter/X)</option>
              <option value="facebook.com">facebook.com (Facebook)</option>
            </select>

            <!-- Manual Input -->
            <input
              id="instance-name"
              v-model="formData.instanceName"
              type="text"
              :placeholder="dynamicPlaceholder"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :class="{ 'pr-10': instanceInfo && instanceInfo.type !== 'unknown' }"
              @input="handleInstanceChange"
              @focus="handleInputFocus"
              @blur="handleInputBlur"
            />
            <!-- Check Mark for Supported Instances -->
            <div v-if="instanceInfo && instanceInfo.type !== 'unknown'" class="absolute right-3 top-14 flex items-center">
              <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <!-- Loading Spinner -->
            <div v-else-if="instanceStore.loading" class="absolute right-3 top-14 flex items-center">
              <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            </div>
          </div>

          <!-- Instance Type Display -->
          <div v-if="instanceInfo" class="mt-2 flex items-center">
            <img
              v-if="instanceInfo.config?.icon"
              :src="instanceInfo.config.icon"
              :alt="instanceInfo.type"
              class="w-6 h-6 mr-2"
              @error="handleImageError"
            />
            <span class="text-sm font-medium text-gray-700">
              {{ $t('share.instanceType') }}: {{ instanceInfo.type }}
            </span>
            <!-- Source display for unknown type -->
            <span v-if="instanceInfo.type === 'unknown' && instanceInfo.source" class="text-xs text-gray-400 ml-2">
              ({{ instanceInfo.source }})
            </span>
          </div>

          <!-- Unified Error Display -->
          <div v-if="shouldShowErrorMessage" class="mt-2 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-yellow-800">
                  {{ getErrorMessage }}
                </h3>
              </div>
            </div>
          </div>

          <!-- Error Display (moved to unified section above) -->
          <!-- <div v-if="instanceStore.error" class="mt-2 text-sm text-red-600">
            {{ instanceStore.error }}
          </div> -->

          <!-- Cookie Disabled Notice -->
          <div v-if="cookieConsent === false" class="mt-2 text-xs text-gray-400">
            {{ $t('cookies.noSaveNotice') }}
            <button
              @click="showCookieSettings"
              class="text-blue-400 hover:text-blue-600 underline ml-1"
            >
              {{ $t('cookies.changeSettings') }}
            </button>
          </div>
        </div>

        <!-- Post Text -->
        <div v-if="canUseParam('text')">
          <label for="post-text" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('share.postText') }}
          </label>
          <textarea
            id="post-text"
            v-model="formData.text"
            rows="4"
            :placeholder="$t('share.postTextPlaceholder')"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <!-- URL -->
        <div v-if="canUseParam('url')">
          <label for="post-url" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('share.postUrl') }}
          </label>
          <input
            id="post-url"
            v-model="formData.url"
            type="url"
            :placeholder="$t('share.postUrlPlaceholder')"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Hashtag -->
        <div v-if="canUseParam('hashtag')">
          <label for="hashtag" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('share.hashtag') }}
          </label>
          <input
            id="hashtag"
            v-model="formData.hashtag"
            type="text"
            :placeholder="$t('share.hashtagPlaceholder')"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Visibility -->
        <div v-if="canUseParam('visibility') && availableVisibility.length > 0">
          <label for="visibility" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('share.visibility') }}
          </label>
          <select
            id="visibility"
            v-model="formData.visibility"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option
              v-for="option in availableVisibility"
              :key="option"
              :value="option"
            >
              {{ $t(`share.visibilityOptions.${option}`) }}
            </option>
          </select>
        </div>

        <!-- Bottom Submit Button -->
        <div class="pt-4">
          <button
            type="submit"
            :disabled="!formData.instanceName.trim() || (instanceInfo && instanceInfo.type === 'unknown') || instanceStore.loading"
            class="w-full flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100"
          >
            <span v-if="instanceStore.loading">{{ $t('common.loading') }}</span>
            <span v-else>🚀 {{ $t('share.postButton') }}</span>
          </button>
        </div>

        <!-- Removed duplicate error displays - now unified above -->
      </form>
    </div>

    <!-- Clear Server History Button -->
    <div v-if="rememberedServer && cookieConsent === true" class="mt-8 text-center">
      <button
        @click="clearServerHistory"
        class="text-sm text-gray-500 hover:text-red-600 underline transition-colors"
      >
        {{ $t('share.clearHistory') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, watch, ref, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useInstanceStore } from '@/stores/instanceStore'

// Configuration constants
const DEBOUNCE_DELAY = 900 // ms

const route = useRoute()
const instanceStore = useInstanceStore()
const { t: $t } = useI18n()

// Form data
const formData = reactive({
  instanceName: '',
  text: '',
  url: '',
  visibility: 'public',
  hashtag: ''
})

// Auto-redirect functionality
const autoRedirect = ref(false)
const countdown = ref(0)
let countdownTimer = null

// Query parameters loaded flag
const hasQueryParams = ref(false)

// Auto-redirect error
const showAutoRedirectError = ref(false)

// Preset instance selection
const selectedPresetInstance = ref('')

// Placeholder rotation
const placeholderServers = ['mastodon.social', 'misskey.io', 'x.com', 'facebook.com', 'blob.cat', 'handon.club', 'pawoo.net', 'mstdn.jp', 'linkedin.com', 'b.hatena.ne.jp', 'line.me']
const currentPlaceholder = ref('')
let placeholderTimer = null
let typingTimer = null
const isTyping = ref(false)

// Cookie management
const cookieConsent = ref(null) // null: 未設定, true: 許可, false: 拒否
const rememberedServer = ref('')

// Debounce timer
let debounceTimer = null
// Current request controller for cancellation
let currentRequestController = null

// Computed properties
const instanceInfo = computed(() => instanceStore.currentInstance)

const availableVisibility = computed(() => {
  return instanceInfo.value?.config?.availableVisibility || []
})

const dynamicPlaceholder = computed(() => {
  return `${$t('share.manualInputLabel')} (${$t('common.example')}: ${currentPlaceholder.value})`
})

const canUseParam = (param) => {
  // インスタンス情報がある場合は常に表示（APIから取得済み）
  if (instanceInfo.value && instanceInfo.value.type !== 'unknown') {
    return instanceInfo.value.config?.availableParams?.includes(param) || false
  }
  // クエリパラメータがある場合も常に表示
  if (hasQueryParams.value) {
    return true
  }
  // サーバー名が入力されている場合も表示（API待機中）
  if (formData.instanceName.trim()) {
    return true
  }
  return false
}

// 統一されたエラーメッセージ表示の判定
const shouldShowErrorMessage = computed(() => {
  return instanceInfo.value && instanceInfo.value.type === 'unknown'
})

// エラーメッセージの内容を決定
const getErrorMessage = computed(() => {
  if (instanceStore.error) {
    return instanceStore.error
  }
  return $t('share.unsupportedInstance')
})

// FQDN バリデーション関数
const isValidFQDN = (hostname) => {
  if (!hostname || typeof hostname !== 'string') return false

  // 基本的なクリーンアップ
  const cleaned = hostname.trim().replace(/^https?:\/\//, '').replace(/\/$/, '')

  // 空文字チェック
  if (!cleaned) return false

  // ドット（.）が1つ以上含まれているかチェック
  return cleaned.includes('.')
}

// Methods
const getRandomServer = () => {
  const availableServers = placeholderServers.filter(server => server !== currentPlaceholder.value)
  return availableServers[Math.floor(Math.random() * availableServers.length)]
}

const typeText = async (targetText) => {
  isTyping.value = true
  const currentText = currentPlaceholder.value

  // 削除アニメーション（現在のテキストがある場合のみ）
  if (currentText) {
    for (let i = currentText.length; i >= 0; i--) {
      if (formData.instanceName.trim()) {
        isTyping.value = false
        return // 入力があったら中断
      }
      currentPlaceholder.value = currentText.substring(0, i)
      await new Promise(resolve => setTimeout(resolve, 30))
    }

    // 少し待つ
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  // タイピングアニメーション
  for (let i = 0; i <= targetText.length; i++) {
    if (formData.instanceName.trim()) {
      isTyping.value = false
      return // 入力があったら中断
    }
    currentPlaceholder.value = targetText.substring(0, i)
    await new Promise(resolve => setTimeout(resolve, 80))
  }

  isTyping.value = false
}

const startPlaceholderRotation = () => {
  // 入力フィールドが空の場合のみローテーション
  if (!formData.instanceName.trim()) {
    placeholderTimer = setInterval(async () => {
      if (!formData.instanceName.trim() && !isTyping.value) {
        const nextServer = getRandomServer()
        await typeText(nextServer)
      }
    }, 3000)
  }
}

const startInitialTyping = async () => {
  // 最初のサーバーをランダムに選択してタイピング開始
  const initialServer = placeholderServers[Math.floor(Math.random() * placeholderServers.length)]
  await typeText(initialServer)

  // タイピング完了後にローテーション開始
  startPlaceholderRotation()
}

const stopPlaceholderRotation = () => {
  if (placeholderTimer) {
    clearInterval(placeholderTimer)
    placeholderTimer = null
  }
  if (typingTimer) {
    clearTimeout(typingTimer)
    typingTimer = null
  }
  isTyping.value = false
}

const loadCookieSettings = () => {
  const consent = localStorage.getItem('cookieConsent')
  cookieConsent.value = consent === 'accepted' ? true : consent === 'declined' ? false : null

  if (cookieConsent.value === true) {
    const saved = localStorage.getItem('lastUsedServer')
    if (saved) {
      rememberedServer.value = saved
      // 記憶されたサーバーをデフォルト選択
      selectedPresetInstance.value = saved
      // フォームにも設定して自動的にAPI呼び出し
      formData.instanceName = saved
      // 自動的にインスタンス情報を取得
      handleInstanceChange()
    }
  }
}

const showCookieSettings = () => {
  // グローバルイベントを発火してApp.vueでCookieBannerを表示
  window.dispatchEvent(new CustomEvent('showCookieSettings'))
}

const handleCookieConsentChange = (event) => {
  loadCookieSettings()

  // Cookie拒否時はサーバー履歴をクリア
  if (event.detail === 'declined') {
    rememberedServer.value = ''
    selectedPresetInstance.value = ''
  }
}

const saveServerToHistory = (serverName) => {
  if (cookieConsent.value === true && serverName && serverName.trim()) {
    localStorage.setItem('lastUsedServer', serverName.trim())
    rememberedServer.value = serverName.trim()
  }
}

const clearServerHistory = () => {
  localStorage.removeItem('lastUsedServer')
  rememberedServer.value = ''
  selectedPresetInstance.value = ''
}

const handlePresetSelection = () => {
  if (selectedPresetInstance.value) {
    formData.instanceName = selectedPresetInstance.value
    handleInstanceChange()
  }
}

const handleInputFocus = () => {
  stopPlaceholderRotation()
}

const handleInputBlur = () => {
  // ブラー時は値の変更チェックのみ（ローテーション制御なし）
  handleInstanceChange()
}

const handleInstanceChange = () => {
  // 入力があったらローテーションを停止
  if (formData.instanceName.trim()) {
    stopPlaceholderRotation()
  } else {
    // 入力が空になったらローテーション再開
    startPlaceholderRotation()
  }

  // 入力が変更された時点で古い結果を即座にクリア（空の場合のみ）
  if (!formData.instanceName.trim()) {
    instanceStore.currentInstance = null
    instanceStore.clearError()
  }

  // Cancel any ongoing request
  if (currentRequestController) {
    currentRequestController.abort()
    currentRequestController = null
  }

  // Clear existing timer
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  // Set new timer with configurable delay
  debounceTimer = setTimeout(async () => {
    const trimmedInput = formData.instanceName.trim()

    if (trimmedInput) {
      // FQDN バリデーション
      if (!isValidFQDN(trimmedInput)) {
        // 不正なホスト名の場合はunknownタイプとして処理
        instanceStore.currentInstance = {
          name: trimmedInput,
          type: 'unknown',
          config: { name: 'unknown' }
        }
        instanceStore.error = $t('share.invalidHostname')
        return
      }

      // Create new abort controller for this request
      currentRequestController = new AbortController()

      try {
        const result = await instanceStore.fetchInstanceInfo(trimmedInput)
        // APIレスポンスからsource情報を取得して保存
        if (result && result.type === 'unknown' && result.source) {
          instanceStore.currentInstance.source = result.source
        }
      } catch (error) {
        // Ignore aborted requests
        if (error.name !== 'AbortError') {
          console.error('Instance fetch error:', error)
        }
      } finally {
        currentRequestController = null
      }
    }
  }, DEBOUNCE_DELAY)
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
}

const handleSubmit = () => {
  if (!formData.instanceName.trim()) {
    return
  }

  if (!instanceInfo.value || instanceInfo.value.type === 'unknown') {
    return
  }

  // サーバー履歴を保存
  saveServerToHistory(formData.instanceName)

  const shareUrl = instanceStore.generateShareUrl(
    instanceInfo.value.name,
    instanceInfo.value.type,
    {
      text: formData.text,
      url: formData.url,
      visibility: formData.visibility,
      hashtag: formData.hashtag
    }
  )

  if (shareUrl && shareUrl !== '/') {
    window.open(shareUrl, '_blank')
  }
}

const startCountdown = () => {
  countdown.value = 3
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownTimer)
      handleSubmit()
    }
  }, 1000)
}

const parseQueryParams = () => {
  const params = route.query

  // クエリパラメータが存在するかチェック
  const hasParams = !!(params.i || params.t || params.s || params.v || params.h || params.a)
  hasQueryParams.value = hasParams

  // デバッグ用ログ
  console.log('Raw query params:', params)
  console.log('Has query params:', hasParams)

  // Map query parameters (すべてオプショナル)
  if (params.i) {
    const decoded = typeof params.i === 'string' ? decodeURIComponent(params.i) : params.i
    formData.instanceName = decoded.replace(/^https?:\/\//, '').replace(/\/$/, '')
    console.log('Instance name set to:', formData.instanceName)
  }
  if (params.t) {
    const decoded = typeof params.t === 'string' ? decodeURIComponent(params.t) : params.t
    formData.text = decoded
    console.log('Text set to:', formData.text)
  }
  if (params.s) {
    const decoded = typeof params.s === 'string' ? decodeURIComponent(params.s) : params.s
    formData.url = decoded
    console.log('URL set to:', formData.url)
  }
  if (params.v) {
    const decoded = typeof params.v === 'string' ? decodeURIComponent(params.v) : params.v
    formData.visibility = decoded
    console.log('Visibility set to:', formData.visibility)
  }
  if (params.h) {
    const decoded = typeof params.h === 'string' ? decodeURIComponent(params.h) : params.h
    formData.hashtag = decoded
    console.log('Hashtag set to:', formData.hashtag)
  }

  // Auto-redirect functionality
  if (params.a && params.i) {
    autoRedirect.value = true
    console.log('Auto-redirect enabled')

    // Wait for instance info to be loaded, then start countdown
    const stopWatcher = watch(instanceInfo, (newInfo) => {
      if (newInfo && newInfo.type !== 'unknown') {
        startCountdown()
        stopWatcher() // ウォッチャーを停止
      }
    }, { immediate: true })
  }
}

onMounted(() => {
  // Cookie設定とサーバー履歴を読み込み
  loadCookieSettings()

  // Cookie同意変更のイベントリスナー
  window.addEventListener('cookieConsentChanged', handleCookieConsentChange)
  window.addEventListener('showCookieSettings', () => {
    // App.vueにCookie設定表示を要求
    window.dispatchEvent(new CustomEvent('requestCookieSettings'))
  })

  // 初期タイピングアニメーション開始
  startInitialTyping()

  parseQueryParams()

  if (formData.instanceName) {
    handleInstanceChange()
  }

  // ルートのクエリパラメータ変更を監視
  watch(() => route.query, () => {
    parseQueryParams()
    if (formData.instanceName) {
      handleInstanceChange()
    }
  }, { deep: true })
})

onUnmounted(() => {
  // イベントリスナーのクリーンアップ
  window.removeEventListener('cookieConsentChanged', handleCookieConsentChange)

  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  if (placeholderTimer) {
    clearInterval(placeholderTimer)
  }
  if (typingTimer) {
    clearTimeout(typingTimer)
  }
  if (currentRequestController) {
    currentRequestController.abort()
  }
})
</script>
