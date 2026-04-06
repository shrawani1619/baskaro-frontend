/**
 * HTTP client for Baskaro backend. Uses VITE_API_URL or same-origin /api (Vite proxy).
 */

import { getToken } from '../auth.js'

const base = () => (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

export async function apiRequest(path, options = {}) {
  const { method = 'GET', body, auth = false, headers = {} } = options
  const url = `${base()}${path.startsWith('/') ? path : `/${path}`}`

  const h = { ...headers }
  if (body !== undefined && !h['Content-Type']) {
    h['Content-Type'] = 'application/json'
  }
  if (auth) {
    const t = getToken()
    if (t) h.Authorization = `Bearer ${t}`
  }

  const res = await fetch(url, {
    method,
    headers: h,
    body: body !== undefined ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined,
  })

  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { raw: text }
  }

  if (!res.ok) {
    const msg =
      data?.message ||
      data?.error ||
      (typeof data === 'string' ? data : null) ||
      res.statusText ||
      'Request failed'
    const err = new Error(msg)
    err.status = res.status
    err.body = data
    throw err
  }

  return data
}

/** Unwraps { success, data } from helpers; passes through raw JSON otherwise. */
export function unwrap(data) {
  if (data && typeof data === 'object' && 'success' in data && 'data' in data) {
    return data.data
  }
  return data
}
