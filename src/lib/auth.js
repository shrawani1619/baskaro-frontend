/**
 * JWT session: { token, user } stored in localStorage.
 */

const SESSION_KEY = 'baskaro_session'

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

export function getToken() {
  return getSession()?.token ?? null
}

export function getUser() {
  return getSession()?.user ?? null
}

export function setSession({ token, user }) {
  if (!token || !user) {
    localStorage.removeItem(SESSION_KEY)
    return
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ token, user }))
}

/** Merge updates into stored user (e.g. after PATCH /me). */
export function updateSessionUser(partial) {
  const s = getSession()
  if (!s?.token || !s?.user) return
  setSession({ token: s.token, user: { ...s.user, ...partial } })
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export function isLoggedIn() {
  return !!getToken()
}

const ADMIN_ROLES = new Set(['admin', 'SUPER_ADMIN', 'MANAGER', 'SUPPORT'])

export function isAdminUser(user = getUser()) {
  if (!user) return false
  if (user.accountType === 'admin') return true
  return ADMIN_ROLES.has(user.role)
}
