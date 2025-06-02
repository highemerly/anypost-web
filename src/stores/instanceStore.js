import { defineStore } from 'pinia'
import axios from 'axios'

// Configuration constants
const API_TIMEOUT = 9000 // ms

// Instance type constants
export const INSTANCE_TYPES = {
  MISSKEY: 'misskey',
  MASTODON: 'mastodon',
  PLEROMA: 'pleroma',
  GNUSOCIAL: 'gnusocial',
  DIASPORA: 'diaspora',
  FRIENDICA: 'friendica',
  TWITTER: 'twitter',
  FACEBOOK: 'facebook',
  LINKEDIN: 'linkedin',
  LINE: 'line',
  HATENA: 'hatenabookmark',
  PINTEREST: 'pinterest',
  XING: 'xing',
  ERROR: 'unknown'
}

// Instance configurations
const instanceConfigs = {
  [INSTANCE_TYPES.MISSKEY]: {
    name: INSTANCE_TYPES.MISSKEY,
    icon: '/assets/brand/misskey.png',
    availableParams: ['text', 'visibility', 'url'],
    availableVisibility: ['public', 'home', 'followers', 'specified'],
    generateUrl: (instanceName, params) => {
      const url = new URL(`https://${instanceName}/share`)
      if (params.text) url.searchParams.set('text', params.text)
      if (params.url) url.searchParams.set('url', params.url)
      if (params.visibility) url.searchParams.set('visibility', params.visibility)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.MASTODON]: {
    name: INSTANCE_TYPES.MASTODON,
    icon: '/assets/brand/mastodon.png',
    availableParams: ['text', 'visibility', 'url'],
    availableVisibility: ['public', 'unlisted', 'private', 'direct'],
    generateUrl: (instanceName, params) => {
      const url = new URL(`https://${instanceName}/share`)
      if (params.text) url.searchParams.set('text', params.text)
      if (params.url) url.searchParams.set('url', params.url)
      if (params.visibility) url.searchParams.set('visibility', params.visibility)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.PLEROMA]: {
    name: INSTANCE_TYPES.PLEROMA,
    icon: '/assets/brand/pleroma.png',
    availableParams: ['text', 'url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL(`https://${instanceName}/`)
      if (params.text) url.searchParams.set('message', params.text)
      if (params.url) url.searchParams.set('url', params.url)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.GNUSOCIAL]: {
    name: INSTANCE_TYPES.GNUSOCIAL,
    icon: '/assets/brand/gnusocial.png',
    availableParams: ['text'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL(`https://${instanceName}/notice/new`)
      if (params.text) url.searchParams.set('status_textarea', params.text)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.DIASPORA]: {
    name: INSTANCE_TYPES.DIASPORA,
    icon: '/assets/brand/diaspora.png',
    availableParams: ['text', 'url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL(`https://${instanceName}/bookmarklet`)
      if (params.text) url.searchParams.set('notes', params.text)
      if (params.url) url.searchParams.set('url', params.url)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.FRIENDICA]: {
    name: INSTANCE_TYPES.FRIENDICA,
    icon: '/assets/brand/friendica.png',
    availableParams: ['text', 'url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL(`https://${instanceName}/bookmarklet`)
      if (params.text) url.searchParams.set('title', params.text)
      if (params.url) url.searchParams.set('url', params.url)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.TWITTER]: {
    name: INSTANCE_TYPES.TWITTER,
    icon: '/assets/brand/twitter.png',
    availableParams: ['text', 'url', 'hashtag'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL('https://twitter.com/intent/tweet')
      if (params.text) url.searchParams.set('text', params.text)
      if (params.url) url.searchParams.set('url', params.url)
      if (params.hashtag) url.searchParams.set('hashtags', params.hashtag)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.FACEBOOK]: {
    name: INSTANCE_TYPES.FACEBOOK,
    icon: '/assets/brand/facebook.png',
    availableParams: ['url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL('https://facebook.com/sharer/sharer.php')
      if (params.url) url.searchParams.set('u', params.url)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.LINKEDIN]: {
    name: INSTANCE_TYPES.LINKEDIN,
    icon: '/assets/brand/linkedin.png',
    availableParams: ['url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL('https://www.linkedin.com/sharing/share-offsite/')
      if (params.url) url.searchParams.set('u', params.url)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.LINE]: {
    name: INSTANCE_TYPES.LINE,
    icon: '/assets/brand/line.png',
    availableParams: ['url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL('https://social-plugins.line.me/lineit/share')
      if (params.url) url.searchParams.set('url', params.url)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.HATENA]: {
    name: INSTANCE_TYPES.HATENA,
    icon: '/assets/brand/hatenabookmark.png',
    availableParams: ['url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL('https://b.hatena.ne.jp/my/add.confirm')
      if (params.url) url.searchParams.set('url', params.url)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.PINTEREST]: {
    name: INSTANCE_TYPES.PINTEREST,
    icon: '/assets/brand/pinterest.png',
    availableParams: ['url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL('https://www.pinterest.com/pin/create/button/')
      if (params.url) url.searchParams.set('url', params.url)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.XING]: {
    name: INSTANCE_TYPES.XING,
    icon: '/assets/brand/other.png',
    availableParams: ['url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL('https://www.xing.com/spi/shares/new')
      if (params.url) url.searchParams.set('url', params.url)
      return url.toString()
    }
  }

  // Add other instance types as needed...
}

// Instance cache - commonly used instances
const instanceCache = [
  { instanceName: 'twitter.com', instanceType: 'twitter' },
  { instanceName: 'x.com', instanceType: 'twitter' },
  { instanceName: 'facebook.com', instanceType: 'facebook' },
  { instanceName: 'mstdn.jp', instanceType: 'mastodon' },
  { instanceName: 'mastodon.cloud', instanceType: 'mastodon' },
  { instanceName: 'mastodon.social', instanceType: 'mastodon' },
  { instanceName: 'pawoo.net', instanceType: 'mastodon' },
  { instanceName: 'best-friends.chat', instanceType: 'mastodon' },
  { instanceName: 'fedibird.com', instanceType: 'fedibird' },
  { instanceName: 'misskey.io', instanceType: 'misskey' }
]

export const useInstanceStore = defineStore('instance', {
  state: () => ({
    instanceCache: [...instanceCache],
    apiCache: new Map(), // API結果のキャッシュ
    currentInstance: null,
    loading: false,
    error: null,
    currentController: null,
    currentRequestId: 0
  }),

  getters: {
    getInstanceConfig: (state) => (instanceType) => {
      // Handle special cases
      const typeMap = {
        azpick: INSTANCE_TYPES.MISSKEY,
        fedibird: INSTANCE_TYPES.MASTODON,
        akkoma: INSTANCE_TYPES.PLEROMA,
        cherrypick: INSTANCE_TYPES.MISSKEY,
        iceshrimp: INSTANCE_TYPES.MISSKEY
      }

      const mappedType = typeMap[instanceType] || instanceType
      return instanceConfigs[mappedType] || instanceConfigs[INSTANCE_TYPES.ERROR]
    },

    isInstanceSupported: (state) => (instanceType) => {
      return instanceType && instanceType !== INSTANCE_TYPES.ERROR
    }
  },

  actions: {
    getInstanceFromCache(instanceName) {
      const cached = this.instanceCache.find(
        item => item.instanceName === instanceName
      )
      return cached ? this.getInstanceConfig(cached.instanceType) : null
    },

    async fetchInstanceInfo(instanceName) {
      if (!instanceName) {
        this.error = 'Instance name is required'
        return null
      }

      // Clean instance name
      const cleanInstanceName = instanceName
        .replace(/^https?:\/\//, '')
        .replace(/\/$/, '')

      // Check API cache first
      if (this.apiCache.has(cleanInstanceName)) {
        const cachedType = this.apiCache.get(cleanInstanceName)
        const config = this.getInstanceConfig(cachedType)
        this.currentInstance = {
          name: cleanInstanceName,
          type: cachedType,
          config
        }
        return this.currentInstance
      }

      // Cancel previous request if exists
      if (this.currentController) {
        this.currentController.abort()
      }

      // Generate unique request ID
      const requestId = ++this.currentRequestId

      // Create new controller for this request
      this.currentController = new AbortController()

      this.loading = true
      this.error = null

      try {
        // Check static cache
        const cachedInfo = this.getInstanceFromCache(cleanInstanceName)
        if (cachedInfo && cachedInfo.name !== INSTANCE_TYPES.ERROR) {
          // Check if this is still the latest request
          if (requestId !== this.currentRequestId) {
            return null // Ignore outdated request
          }

          // Add to API cache
          this.apiCache.set(cleanInstanceName, cachedInfo.name)

          this.currentInstance = {
            name: cleanInstanceName,
            type: cachedInfo.name,
            config: cachedInfo
          }
          this.loading = false
          this.currentController = null
          return this.currentInstance
        }

        // Fetch from API
        const response = await axios.get(
          `https://anypost.dev/api/v1/instances/${cleanInstanceName}`,
          {
            timeout: API_TIMEOUT,
            signal: this.currentController.signal
          }
        )

        // Check if this is still the latest request before updating state
        if (requestId !== this.currentRequestId) {
          return null // Ignore outdated request
        }

        let instanceType = INSTANCE_TYPES.ERROR

        if (response.data && response.data.type !== 'unknown') {
          instanceType = response.data.type

          // Add to static cache if successful
          const config = this.getInstanceConfig(instanceType)
          if (config.name !== INSTANCE_TYPES.ERROR) {
            this.instanceCache.push({
              instanceName: cleanInstanceName,
              instanceType: response.data.type
            })
          }
        }

        // Add to API cache (including unknown types to avoid repeated requests)
        this.apiCache.set(cleanInstanceName, instanceType)

        const config = this.getInstanceConfig(instanceType)
        this.currentInstance = {
          name: cleanInstanceName,
          type: instanceType,
          config,
          source: response.data?.source || null // source情報を追加
        }

        this.loading = false
        this.currentController = null
        return this.currentInstance
      } catch (error) {
        // Don't update state if request was aborted or outdated
        if (error.name === 'AbortError' || requestId !== this.currentRequestId) {
          return null
        }

        console.error('Failed to fetch instance info:', error)
        this.error = error.message

        // Don't cache errors - allow retry
        const config = this.getInstanceConfig(INSTANCE_TYPES.ERROR)
        this.currentInstance = {
          name: cleanInstanceName,
          type: INSTANCE_TYPES.ERROR,
          config
        }
        this.loading = false
        this.currentController = null
        return this.currentInstance
      }
    },

    generateShareUrl(instanceName, instanceType, params) {
      const config = this.getInstanceConfig(instanceType)
      if (config.generateUrl) {
        return config.generateUrl(instanceName, params)
      }
      return '/'
    },

    clearError() {
      this.error = null
    }
  }
})
