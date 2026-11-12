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
  REDDIT: 'reddit',
  LEMMY: 'lemmy',
  BLUESKY: 'bluesky',
  WHATSAPP: 'whatsapp',
  TELEGRAM: 'telegram',
  THREADS: 'threads',
  HUBZILLA: 'hubzilla',
  SNAC: 'snac',
  PIEFED: 'piefed',
  ICESHRIMP_NET: 'iceshrimp.net',
  TUMBLR: 'tumblr',
  TAITTSUU: 'taittsuu',
  ERROR: 'unknown'
}

// For services whose share page has only a text box: put the URL after the
// text, the same way Mastodon's /share joins its text and url parameters.
const joinTextAndUrl = (params) => [params.text, params.url].filter(Boolean).join(' ')

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
      // Pleroma-FE / Akkoma-FE read only ?message= (a url parameter is ignored)
      const url = new URL(`https://${instanceName}/`)
      const message = joinTextAndUrl(params)
      if (message) url.searchParams.set('message', message)
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
      const url = new URL('https://x.com/intent/tweet')
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
      if (params.url) url.searchParams.set('url', params.url)
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
  },

  [INSTANCE_TYPES.REDDIT]: {
    name: INSTANCE_TYPES.REDDIT,
    icon: '/assets/brand/reddit.png',
    availableParams: ['text', 'url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL('https://www.reddit.com/submit')
      if (params.text) url.searchParams.set('title', params.text)
      if (params.url) url.searchParams.set('url', params.url)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.LEMMY]: {
    name: INSTANCE_TYPES.LEMMY,
    icon: '/assets/brand/lemmy.png',
    availableParams: ['text', 'url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL(`https://${instanceName}/create_post`)
      if (params.text) url.searchParams.set('title', params.text)
      if (params.url) url.searchParams.set('url', params.url)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.BLUESKY]: {
    name: INSTANCE_TYPES.BLUESKY,
    icon: '/assets/brand/bluesky.png',
    availableParams: ['text', 'url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL('https://bsky.app/intent/compose')
      const text = joinTextAndUrl(params)
      if (text) url.searchParams.set('text', text)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.WHATSAPP]: {
    name: INSTANCE_TYPES.WHATSAPP,
    icon: '/assets/brand/whatsapp.png',
    availableParams: ['text', 'url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL('https://wa.me/')
      const text = joinTextAndUrl(params)
      if (text) url.searchParams.set('text', text)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.TELEGRAM]: {
    name: INSTANCE_TYPES.TELEGRAM,
    icon: '/assets/brand/telegram.png',
    availableParams: ['text', 'url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL('https://t.me/share/url')
      if (params.url) url.searchParams.set('url', params.url)
      if (params.text) url.searchParams.set('text', params.text)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.THREADS]: {
    name: INSTANCE_TYPES.THREADS,
    icon: '/assets/brand/threads.png',
    availableParams: ['text', 'url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL('https://www.threads.net/intent/post')
      if (params.text) url.searchParams.set('text', params.text)
      if (params.url) url.searchParams.set('url', params.url)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.HUBZILLA]: {
    name: INSTANCE_TYPES.HUBZILLA,
    icon: '/assets/brand/hubzilla.png',
    availableParams: ['text', 'url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      // rpost: f= is an empty placeholder; url is fetched and its preview appended to the body
      const url = new URL(`https://${instanceName}/rpost`)
      url.searchParams.set('f', '')
      if (params.text) url.searchParams.set('body', params.text)
      if (params.url) url.searchParams.set('url', params.url)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.SNAC]: {
    name: INSTANCE_TYPES.SNAC,
    icon: '/assets/brand/snac.png',
    availableParams: ['text', 'url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      // Mastodon-like /share. It is optional for the server admin to route it to snac.
      const url = new URL(`https://${instanceName}/share`)
      if (params.text) url.searchParams.set('text', params.text)
      if (params.url) url.searchParams.set('url', params.url)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.PIEFED]: {
    name: INSTANCE_TYPES.PIEFED,
    icon: '/assets/brand/piefed.png',
    availableParams: ['text', 'url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      // /share shares a link to a community; it fails without the url parameter
      const url = new URL(`https://${instanceName}/share`)
      url.searchParams.set('url', params.url || '')
      if (params.text) url.searchParams.set('title', params.text)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.ICESHRIMP_NET]: {
    name: INSTANCE_TYPES.ICESHRIMP_NET,
    icon: '/assets/brand/iceshrimp.png',
    availableParams: ['text', 'url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      // /share accepts title, text and url, but concatenates them without a
      // separator, so the URL goes into text ourselves
      const url = new URL(`https://${instanceName}/share`)
      const text = joinTextAndUrl(params)
      if (text) url.searchParams.set('text', text)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.TUMBLR]: {
    name: INSTANCE_TYPES.TUMBLR,
    icon: '/assets/brand/tumblr.png',
    availableParams: ['text', 'url', 'hashtag'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      const url = new URL('https://www.tumblr.com/widgets/share/tool')
      if (params.url) {
        url.searchParams.set('posttype', 'link')
        url.searchParams.set('canonicalUrl', params.url)
        if (params.text) url.searchParams.set('caption', params.text)
      } else {
        url.searchParams.set('posttype', 'text')
        if (params.text) url.searchParams.set('content', params.text)
      }
      if (params.hashtag) url.searchParams.set('tags', params.hashtag)
      return url.toString()
    }
  },

  [INSTANCE_TYPES.TAITTSUU]: {
    name: INSTANCE_TYPES.TAITTSUU,
    icon: '/assets/brand/taittsuu.png',
    availableParams: ['text', 'url'],
    availableVisibility: [],
    generateUrl: (instanceName, params) => {
      // https://taittsuu.com/share_link : only text
      const url = new URL('https://taittsuu.com/share')
      const text = joinTextAndUrl(params)
      if (text) url.searchParams.set('text', text)
      return url.toString()
    }
  }
}

export const useInstanceStore = defineStore('instance', {
  state: () => ({
    instanceCache: [],
    apiCache: new Map(), // API結果のキャッシュ
    currentInstance: null,
    loading: false,
    error: null,
    currentController: null,
    currentRequestId: 0
  }),

  getters: {
    // null for 'unknown' and for types the API knows but we can't share to
    // (e.g. gotosocial, mbin)
    getInstanceConfig: (state) => (instanceType) => {
      return instanceConfigs[instanceType] || null
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
        this.error = 'invalidServer'
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
        this.error = config ? null : 'unsupportedServer'
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
        if (cachedInfo) {
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

        // Fetch from API (same-origin; nginx proxies /api/ to the upstream)
        const response = await axios.get(
          `/api/v1/instances/${cleanInstanceName}`,
          {
            timeout: API_TIMEOUT,
            signal: this.currentController.signal
          }
        )

        // Check if this is still the latest request before updating state
        if (requestId !== this.currentRequestId) {
          return null // Ignore outdated request
        }

        const apiType = response.data?.type
        const config = this.getInstanceConfig(apiType)
        const instanceType = config ? apiType : INSTANCE_TYPES.ERROR

        if (config) {
          this.instanceCache.push({
            instanceName: cleanInstanceName,
            instanceType
          })
        } else {
          // The API recognized the server (e.g. gotosocial) but we have no
          // share page for it
          this.error = 'unsupportedServer'
        }

        // Add to API cache (including unknown types to avoid repeated requests)
        this.apiCache.set(cleanInstanceName, instanceType)

        this.currentInstance = {
          name: cleanInstanceName,
          type: instanceType,
          config,
          source: response.data?.source || null, // source情報を追加
          detectedType: config || !apiType || apiType === 'unknown' ? null : apiType
        }

        this.loading = false
        this.currentController = null
        return this.currentInstance
      } catch (error) {
        // Don't update state if request was aborted or outdated
        if (error.name === 'AbortError' || error.name === 'CanceledError' || requestId !== this.currentRequestId) {
          return null
        }

        console.error('Failed to fetch instance info:', error)

        const status = error.response?.status
        if (status === 400) {
          this.error = 'invalidServer'
        } else if (status === 404) {
          this.error = 'unsupportedServer'
        } else if (status === 502 || status === 503) {
          this.error = 'serviceDown'
        } else {
          this.error = 'unsupportedServer'
        }

        // Don't cache errors - allow retry
        this.currentInstance = {
          name: cleanInstanceName,
          type: INSTANCE_TYPES.ERROR,
          config: null
        }
        this.loading = false
        this.currentController = null
        return this.currentInstance
      }
    },

    generateShareUrl(instanceName, instanceType, params) {
      const config = this.getInstanceConfig(instanceType)
      if (config?.generateUrl) {
        return config.generateUrl(instanceName, params)
      }
      return '/'
    },

    clearError() {
      this.error = null
    }
  }
})
