import apiClient from '../client'
import type { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, User } from '../types'

/**
 * User API Module
 * Handles authentication and user-related API calls
 */

// Login
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<ApiResponse<LoginResponse>>('/user/login', credentials)
  return response.data.data
}

// Register
export const register = async (userData: RegisterRequest): Promise<User> => {
  const response = await apiClient.post<ApiResponse<User>>('/user/register', userData)
  return response.data.data
}

// Get current user info
export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<ApiResponse<User>>('/user/info')
  return response.data.data
}

// Logout
export const logout = async (): Promise<void> => {
  await apiClient.post('/user/logout')
}

// Update user info
export const updateUser = async (userData: Partial<User>): Promise<User> => {
  const response = await apiClient.put<ApiResponse<User>>('/user/update', userData)
  return response.data.data
}

// Change password
export const changePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
  await apiClient.post('/user/change-password', {
    oldPassword,
    newPassword,
  })
}
