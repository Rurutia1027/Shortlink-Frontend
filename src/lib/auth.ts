import Cookies from 'js-cookie'

/**
 * Auth Utilities
 * Additional helper functions for React/Next.js
 */

// Cookie keys 
const TokenKey = 'token'
const USERNAME_KEY = 'username'

export function getToken(): string | undefined {
  return Cookies.get(TokenKey)
}

export function setToken(token: string, rememberMe?: boolean): void {
  if (rememberMe) {
    Cookies.set(TokenKey, token, { expires: 7 }) // 7 days
  } else {
    Cookies.set(TokenKey, token) // Session cookie (matching Vue)
  }
}

export function removeToken(): void {
  Cookies.remove(TokenKey)
}

export function removeKey(): void {
  removeToken()
}

// Username management 
export function getUsername(): string | undefined {
  return Cookies.get(USERNAME_KEY)
}

export function setUsername(username: string, rememberMe?: boolean): void {
  if (rememberMe) {
    Cookies.set(USERNAME_KEY, username, { expires: 7 }) // 7 days
  } else {
    Cookies.set(USERNAME_KEY, username) // Session cookie  
  }
}

export function removeUsername(): void {
  Cookies.remove(USERNAME_KEY)
}

/**
 * Clear all auth data (token and username)
 */
export function clearAuth(): void {
  removeToken()
  removeUsername()
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getToken()
}
