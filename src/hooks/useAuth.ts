'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { login as loginApi, register as registerApi, getCurrentUser, logout as logoutApi, queryUserInfo } from '@/src/api'
import { setToken, removeToken, getToken, setUsername, removeUsername, getUsername, clearAuth } from '@/src/lib/auth'
import type { LoginRequest, RegisterRequest, User } from '@/src/api/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface UseAuthReturn extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>
  register: (userData: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const router = useRouter()
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  // Check authentication status on mount
  useEffect(() => {
    // Migrate token from localStorage to cookies (matching Vue router.beforeEach)
    // Vue: setToken(localStorage.getItem('token'))
    // Vue: setUsername(localStorage.getItem('username'))
    if (typeof window !== 'undefined') {
      const tokenFromStorage = localStorage.getItem('token')
      const usernameFromStorage = localStorage.getItem('username')
      
      if (tokenFromStorage) {
        setToken(tokenFromStorage)
      }
      if (usernameFromStorage) {
        setUsername(usernameFromStorage)
      }
    }
    
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = getToken()
    
    if (!token) {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
      return
    }

    try {
      // Fetch current user info
      const user = await getCurrentUser()
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      // Token is invalid, clear auth
      clearAuth()
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  }

  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      const apiResponse = await loginApi(credentials)
      // API returns ApiResponse<LoginResponse>, so we need to access .data
      const response = apiResponse.data
      
      // Save token and username
      setToken(response.token, credentials.rememberMe || false)
      setUsername(response.user.username, credentials.rememberMe || false)
      
      // Update state
      setState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      })

      // Redirect to dashboard or specified redirect URL
      const redirectUrl = new URLSearchParams(window.location.search).get('redirect') || '/space'
      router.push(redirectUrl)
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }))
      throw error
    }
  }, [router])

  const register = useCallback(async (userData: RegisterRequest) => {
    try {
      // API returns ApiResponse<User>, so we need to access .data
      await registerApi(userData)
      
      // After registration, redirect to login
      router.push('/login')
    } catch (error) {
      throw error
    }
  }, [router])

  const logout = useCallback(async () => {
    try {
      // Get token and username before clearing auth
      const token = getToken()
      const username = getUsername()
      
      // Call logout API with token and username (matching Vue implementation)
      if (token && username) {
        await logoutApi({ token, username }).catch(() => {
          // Ignore errors if logout API fails
        })
      }
    } finally {
      // Clear local auth data
      clearAuth()
      
      // Update state
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })

      // Redirect to login
      router.push('/login')
    }
  }, [router])

  const refreshUser = useCallback(async () => {
    try {
      const user = await getCurrentUser()
      setState((prev) => ({
        ...prev,
        user,
        isAuthenticated: true,
      }))
    } catch (error) {
      // If refresh fails, user might not be authenticated
      clearAuth()
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
      router.push('/login')
    }
  }, [router])

  return {
    ...state,
    login,
    register,
    logout,
    refreshUser,
  }
}
