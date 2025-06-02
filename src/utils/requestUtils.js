// Query parameter constants (matching original getRequest.js)
const GETPARAMS = {
  INSTANCE: 'i',
  TEXT: 't',
  URL: 's',
  VISIBILITY: 'v',
  REPLYID: 'r',
  HASHTAG: 'h',
  REDIRECT: 'a'
}

/**
 * Parse URL query parameters into a standardized request object
 * @param {URLSearchParams} searchParams - URL search parameters
 * @returns {Object} Parsed request object
 */
export function parseRequestParams(searchParams) {
  const params = {}

  // Convert URLSearchParams to regular object
  for (const [key, value] of searchParams.entries()) {
    params[key] = decodeURIComponent(value)
  }

  const req = {
    instanceName: params[GETPARAMS.INSTANCE]
      ? params[GETPARAMS.INSTANCE].replace(/^https?:\/\//, '').replace(/\/$/, '')
      : '',
    text: params[GETPARAMS.TEXT] || '',
    url: params[GETPARAMS.URL] || '',
    visibility: params[GETPARAMS.VISIBILITY] || 'public',
    replyId: params[GETPARAMS.REPLYID] || '',
    hashtag: params[GETPARAMS.HASHTAG] || '',
    redirect: !!(params[GETPARAMS.REDIRECT] && params[GETPARAMS.INSTANCE])
  }

  return req
}

/**
 * Generate query string from request object
 * @param {Object} requestData - Request data object
 * @returns {string} Query string
 */
export function generateQueryString(requestData) {
  const params = new URLSearchParams()

  if (requestData.instanceName) {
    params.set(GETPARAMS.INSTANCE, requestData.instanceName)
  }
  if (requestData.text) {
    params.set(GETPARAMS.TEXT, requestData.text)
  }
  if (requestData.url) {
    params.set(GETPARAMS.URL, requestData.url)
  }
  if (requestData.visibility && requestData.visibility !== 'public') {
    params.set(GETPARAMS.VISIBILITY, requestData.visibility)
  }
  if (requestData.hashtag) {
    params.set(GETPARAMS.HASHTAG, requestData.hashtag)
  }
  if (requestData.redirect) {
    params.set(GETPARAMS.REDIRECT, '1')
  }

  return params.toString()
}

/**
 * Create a shareable URL for the AnyPost service
 * @param {Object} requestData - Request data object
 * @returns {string} Shareable URL
 */
export function createShareUrl(requestData) {
  const baseUrl = window.location.origin + '/share'
  const queryString = generateQueryString(requestData)

  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

export { GETPARAMS }
