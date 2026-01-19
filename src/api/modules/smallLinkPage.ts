import apiClient from '../client'
import type {
  ApiResponse,
  ShortLink,
  CreateShortLinkRequest,
  BatchCreateShortLinkRequest,
  UpdateShortLinkRequest,
  ShortLinkListParams,
  PaginatedResponse,
  AnalyticsResponse,
} from '../types'

/**
 * Short Link API Module
 * Handles short link-related API calls
 */

// Get short links list (with pagination)
export const getShortLinks = async (params?: ShortLinkListParams): Promise<PaginatedResponse<ShortLink>> => {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<ShortLink>>>('/link/list', { params })
  return response.data.data
}

// Get short link by ID
export const getShortLinkById = async (id: string): Promise<ShortLink> => {
  const response = await apiClient.get<ApiResponse<ShortLink>>(`/link/${id}`)
  return response.data.data
}

// Create single short link
export const createShortLink = async (linkData: CreateShortLinkRequest): Promise<ShortLink> => {
  const response = await apiClient.post<ApiResponse<ShortLink>>('/link/create', linkData)
  return response.data.data
}

// Batch create short links
export const batchCreateShortLinks = async (linksData: BatchCreateShortLinkRequest): Promise<ShortLink[]> => {
  const response = await apiClient.post<ApiResponse<ShortLink[]>>('/link/batch-create', linksData)
  return response.data.data
}

// Update short link
export const updateShortLink = async (linkData: UpdateShortLinkRequest): Promise<ShortLink> => {
  const response = await apiClient.put<ApiResponse<ShortLink>>('/link/update', linkData)
  return response.data.data
}

// Delete short link (move to recycle bin)
export const deleteShortLink = async (id: string): Promise<void> => {
  await apiClient.delete(`/link/${id}`)
}

// Get recycle bin list
export const getRecycleBinLinks = async (params?: ShortLinkListParams): Promise<PaginatedResponse<ShortLink>> => {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<ShortLink>>>('/link/recycle-bin', { params })
  return response.data.data
}

// Restore short link from recycle bin
export const restoreShortLink = async (id: string): Promise<void> => {
  await apiClient.post(`/link/${id}/restore`)
}

// Permanently delete short link
export const permanentlyDeleteShortLink = async (id: string): Promise<void> => {
  await apiClient.delete(`/link/${id}/permanent`)
}

// Get short link analytics
export const getShortLinkAnalytics = async (
  id: string,
  startDate?: string,
  endDate?: string
): Promise<AnalyticsResponse> => {
  const params: Record<string, string> = {}
  if (startDate) params.startDate = startDate
  if (endDate) params.endDate = endDate
  
  const response = await apiClient.get<ApiResponse<AnalyticsResponse>>(`/link/${id}/analytics`, { params })
  return response.data.data
}

// Get short link by short code (for redirect)
export const getShortLinkByCode = async (shortCode: string): Promise<ShortLink> => {
  const response = await apiClient.get<ApiResponse<ShortLink>>(`/link/code/${shortCode}`)
  return response.data.data
}
