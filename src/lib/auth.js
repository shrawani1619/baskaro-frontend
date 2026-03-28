/**
 * Simple localStorage-based auth store.
 * In production this would be replaced by a real JWT / session system.
 */

const AUTH_KEY = 'baskaro_user'

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null')
  } catch {
    return null
  }
}

export function setUser(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user))
}

export function clearUser() {
  localStorage.removeItem(AUTH_KEY)
}

export function isLoggedIn() {
  return !!getUser()
}
