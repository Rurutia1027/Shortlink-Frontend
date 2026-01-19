import apiClient from '../client'
import type {
  ApiResponse,
  Group,
  CreateGroupRequest,
  UpdateGroupRequest,
  PaginatedResponse,
} from '../types'

/**
 * Group API Module
 * Matches Vue implementation: api/modules/group.js
 */

// Query groups (GET /group with params)
export const queryGroup = async (params?: any): Promise<ApiResponse<Group[]>> => {
  const response = await apiClient.get<ApiResponse<Group[]>>('/group', { params })
  return response.data
}

// Alias for compatibility
export const getGroups = async (params?: any): Promise<Group[]> => {
  const result = await queryGroup(params)
  return result.data
}

// Create group (POST /group)
export const addGroup = async (data: CreateGroupRequest): Promise<ApiResponse<Group>> => {
  const response = await apiClient.post<ApiResponse<Group>>('/group', data)
  return response.data
}

// Alias for compatibility
export const createGroup = async (data: CreateGroupRequest): Promise<Group> => {
  const result = await addGroup(data)
  return result.data
}

// Update group (PUT /group)
export const editGroup = async (data: UpdateGroupRequest): Promise<ApiResponse<Group>> => {
  const response = await apiClient.put<ApiResponse<Group>>('/group', data)
  return response.data
}

// Alias for compatibility
export const updateGroup = async (data: UpdateGroupRequest): Promise<Group> => {
  const result = await editGroup(data)
  return result.data
}

// Delete group (DELETE /group with params)
export const deleteGroup = async (data: { id?: string }): Promise<void> => {
  await apiClient.delete('/group', { params: data })
}

// Sort groups (POST /group/sort)
export const sortGroup = async (data: any): Promise<void> => {
  await apiClient.post('/group/sort', data)
}

// Alias for compatibility
export const updateGroupSortOrder = async (data: any): Promise<void> => {
  await sortGroup(data)
}

// Query group statistics (GET /stats/group with params)
export const queryGroupStats = async (params?: any): Promise<ApiResponse<any>> => {
  const response = await apiClient.get<ApiResponse<any>>('/stats/group', { params })
  return response.data
}

// Alias for compatibility
export const getGroupStatistics = async (params?: any): Promise<any> => {
  const result = await queryGroupStats(params)
  return result.data
}

// Query group access records (GET /stats/access-record/group with params)
export const queryGroupTable = async (params?: any): Promise<ApiResponse<any>> => {
  const response = await apiClient.get<ApiResponse<any>>('/stats/access-record/group', { params })
  return response.data
}
