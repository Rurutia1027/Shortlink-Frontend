import apiClient from '../client'
import type { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, User } from '../types'

/**
 * User API Module
 * Matches Vue implementation: api/modules/user.js
 */

// Register user (POST /api/shortlink/admin/v1/user)
// Backend endpoint: POST /api/shortlink/admin/v1/user
export const addUser = async (data: RegisterRequest): Promise<ApiResponse<User>> => {
  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[User API] Register request:', {
      username: data.username,
      hasPassword: !!data.password,
      email: data.email,
      baseURL: apiClient.defaults.baseURL,
      fullURL: `${apiClient.defaults.baseURL}/user`,
    })
  }
  
  try {
    const response = await apiClient.post<ApiResponse<User>>('/user', data)
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[User API] Register response:', response.data)
    }
    
    return response.data
  } catch (error: any) {
    // Enhanced error logging
    if (process.env.NODE_ENV === 'development') {
      console.error('[User API] Register error:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
        code: error.code,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
          data: error.config?.data,
        },
      })
    }
    throw error
  }
}

// Alias for compatibility
export const register = async (data: RegisterRequest): Promise<User> => {
  const result = await addUser(data)
  return result.data
}

// Update user info (PUT /user)
export const editUser = async (data: Partial<User>): Promise<ApiResponse<User>> => {
  const response = await apiClient.put<ApiResponse<User>>('/user', data)
  return response.data
}

// Alias for compatibility
export const updateUser = async (data: Partial<User>): Promise<User> => {
  const result = await editUser(data)
  return result.data
}

// Login (POST /user/login)
export const login = async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[User API] Login request:', { username: data.username, hasPassword: !!data.password })
  }
  
  try {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/user/login', data)
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[User API] Login response:', response.data)
    }
    
    return response.data
  } catch (error: any) {
    // Enhanced error logging
    if (process.env.NODE_ENV === 'development') {
      console.error('[User API] Login error:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
        code: error.code,
      })
    }
    throw error
  }
}

// Logout (DELETE /user/logout?token=...&username=...)
export const logout = async (data: { token: string; username: string }): Promise<void> => {
  await apiClient.delete(`/user/logout?token=${data.token}&username=${data.username}`)
}

// Check if username is available (GET /user/isUsernameValidForRegistration with params)
// Backend endpoint: /api/shortlink/admin/v1/user/isUsernameValidForRegistration?username=xxx
// Returns ApiResponse<Boolean> - true if username is valid (not exists), false if exists
export const hasUsername = async (params: { username: string }): Promise<ApiResponse<boolean>> => {
  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[User API] Check username availability:', params)
  }
  
  try {
    const response = await apiClient.get<ApiResponse<boolean>>('/user/isUsernameValidForRegistration', { params })
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[User API] Username availability response:', response.data)
    }
    
    return response.data
  } catch (error: any) {
    // Enhanced error logging
    if (process.env.NODE_ENV === 'development') {
      console.error('[User API] Check username error:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
        code: error.code,
      })
    }
    throw error
  }
}

// Query user info by username (GET /actual/user/{username})
export const queryUserInfo = async (username: string): Promise<ApiResponse<User>> => {
  const response = await apiClient.get<ApiResponse<User>>(`/actual/user/${username}`)
  return response.data
}

// Alias for compatibility - get current user
export const getCurrentUser = async (): Promise<User> => {
  // This might need to be adjusted based on how you get current username
  // For now, assuming it uses the token to get current user
  const response = await apiClient.get<ApiResponse<User>>('/user/info')
  return response.data.data
}
