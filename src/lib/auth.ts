import Cookies from 'js-cookie'

// Cookie keys
const TOKEN_KEY = 'token'
const USERNAME_KEY = 'username'

// Token management
export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY)
}

export const setToken = (token: string, rememberMe: boolean = false): void => {
  const options = rememberMe
    ? { expires: 7 } // 7 days
    : {} // Session cookie
  Cookies.set(TOKEN_KEY, token, options)
}

export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY)
}

// Username management
export const getUsername = (): string | undefined => {
  return Cookies.get(USERNAME_KEY)
}

export const setUsername = (username: string, rememberMe: boolean = false): void => {
  const options = rememberMe
    ? { expires: 7 } // 7 days
    : {} // Session cookie
  Cookies.set(USERNAME_KEY, username, options)
}

export const removeUsername = (): void => {
  Cookies.remove(USERNAME_KEY)
}

// Clear all auth data
export const clearAuth = (): void => {
  removeToken()
  removeUsername()
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken()
}
