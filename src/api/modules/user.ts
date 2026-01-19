import apiClient from '../client'
import type { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, User } from '../types'

/**
 * User API Module
 * Matches Vue implementation: api/modules/user.js
 */

// Register user (POST /user)
export const addUser = async (data: RegisterRequest): Promise<ApiResponse<User>> => {
  const response = await apiClient.post<ApiResponse<User>>('/user', data)
  return response.data
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
  const response = await apiClient.post<ApiResponse<LoginResponse>>('/user/login', data)
  return response.data
}

// Logout (DELETE /user/logout?token=...&username=...)
export const logout = async (data: { token: string; username: string }): Promise<void> => {
  await apiClient.delete(`/user/logout?token=${data.token}&username=${data.username}`)
}

// Check if username is available (GET /user/has-username with params)
export const hasUsername = async (params: { username: string }): Promise<ApiResponse<{ available: boolean }>> => {
  const response = await apiClient.get<ApiResponse<{ available: boolean }>>('/user/has-username', { params })
  return response.data
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
