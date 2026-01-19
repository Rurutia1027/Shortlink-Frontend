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
 * Handles group-related API calls
 */

// Get all groups
export const getGroups = async (): Promise<Group[]> => {
  const response = await apiClient.get<ApiResponse<Group[]>>('/group/list')
  return response.data.data
}

// Get group by ID
export const getGroupById = async (id: string): Promise<Group> => {
  const response = await apiClient.get<ApiResponse<Group>>(`/group/${id}`)
  return response.data.data
}

// Create group
export const createGroup = async (groupData: CreateGroupRequest): Promise<Group> => {
  const response = await apiClient.post<ApiResponse<Group>>('/group/create', groupData)
  return response.data.data
}

// Update group
export const updateGroup = async (groupData: UpdateGroupRequest): Promise<Group> => {
  const response = await apiClient.put<ApiResponse<Group>>('/group/update', groupData)
  return response.data.data
}

// Delete group
export const deleteGroup = async (id: string): Promise<void> => {
  await apiClient.delete(`/group/${id}`)
}

// Update group sort order (drag and drop)
export const updateGroupSortOrder = async (groups: Array<{ id: string; sortOrder: number }>): Promise<void> => {
  await apiClient.put('/group/sort', { groups })
}

// Get group statistics
export const getGroupStatistics = async (groupId: string, startDate?: string, endDate?: string): Promise<any> => {
  const params: Record<string, string> = {}
  if (startDate) params.startDate = startDate
  if (endDate) params.endDate = endDate
  
  const response = await apiClient.get<ApiResponse<any>>(`/group/${groupId}/statistics`, { params })
  return response.data.data
}
