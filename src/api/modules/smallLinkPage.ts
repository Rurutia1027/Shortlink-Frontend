import apiClient from '../client'
import axios from 'axios'
import { getToken, getUsername } from '@/src/lib/auth'
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
 * Matches Vue implementation: api/modules/smallLinkPage.js
 */

// Query short links page (GET /page with params)
export const queryPage = async (params?: ShortLinkListParams): Promise<ApiResponse<PaginatedResponse<ShortLink>>> => {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<ShortLink>>>('/page', { params })
  return response.data
}

// Alias for compatibility
export const getShortLinks = async (params?: ShortLinkListParams): Promise<PaginatedResponse<ShortLink>> => {
  const result = await queryPage(params)
  return result.data
}

// Create single short link (POST /api/shortlink/v1/links/create)
// Backend endpoint: http://localhost:8080/api/shortlink/v1/links/create
export const addSmallLink = async (data: CreateShortLinkRequest): Promise<ApiResponse<ShortLink>> => {
  // Use full URL since backend endpoint differs from base URL
  // TODO: Update API_BASE_URL or create separate client when backend is fully integrated
  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
  const fullUrl = `${backendUrl}/api/shortlink/v1/links/create`
  
  // Use axios directly with full URL and auth headers
  const token = getToken()
  const username = getUsername()
  const response = await axios.post<ApiResponse<ShortLink>>(fullUrl, data, {
    headers: {
      'Content-Type': 'application/json',
      Token: token || '',
      Username: username || '',
    },
    timeout: 15000,
  })
  return response.data
}

// Alias for compatibility
export const createShortLink = async (data: CreateShortLinkRequest): Promise<ShortLink> => {
  const result = await addSmallLink(data)
  return result.data
}

// Batch create short links (POST /create/batch with arraybuffer response)
export const addLinks = async (data: BatchCreateShortLinkRequest): Promise<ArrayBuffer> => {
  const response = await apiClient.post<ArrayBuffer>('/create/batch', data, {
    responseType: 'arraybuffer',
  })
  return response.data
}

// Alias for compatibility
export const batchCreateShortLinks = async (data: BatchCreateShortLinkRequest): Promise<ArrayBuffer> => {
  return await addLinks(data)
}

// Update short link (POST /update)
export const editSmallLink = async (data: UpdateShortLinkRequest): Promise<ApiResponse<ShortLink>> => {
  const response = await apiClient.post<ApiResponse<ShortLink>>('/update', data)
  return response.data
}

// Alias for compatibility
export const updateShortLink = async (data: UpdateShortLinkRequest): Promise<ShortLink> => {
  const result = await editSmallLink(data)
  return result.data
}

// Query title by URL (GET /title with params)
export const queryTitle = async (params: { url: string }): Promise<ApiResponse<{ title?: string }>> => {
  const response = await apiClient.get<ApiResponse<{ title?: string }>>('/title', { params })
  return response.data
}

// Move to recycle bin (POST /recycle-bin/save)
export const toRecycleBin = async (data: { id?: string; gid?: string; fullShortUrl?: string }): Promise<void> => {
  await apiClient.post('/recycle-bin/save', data)
}

// Alias for compatibility
export const deleteShortLink = async (data: { id: string }): Promise<void> => {
  await toRecycleBin(data)
}

// Query recycle bin page (GET /recycle-bin/page with params)
export const queryRecycleBin = async (params?: ShortLinkListParams): Promise<ApiResponse<PaginatedResponse<ShortLink>>> => {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<ShortLink>>>('/recycle-bin/page', { params })
  return response.data
}

// Alias for compatibility
export const getRecycleBinLinks = async (params?: ShortLinkListParams): Promise<PaginatedResponse<ShortLink>> => {
  const result = await queryRecycleBin(params)
  return result.data
}

// Recover link from recycle bin (POST /recycle-bin/recover)
export const recoverLink = async (data: { id?: string; gid?: string; fullShortUrl?: string }): Promise<void> => {
  await apiClient.post('/recycle-bin/recover', data)
}

// Alias for compatibility
export const restoreShortLink = async (data: { id: string }): Promise<void> => {
  await recoverLink(data)
}

// Permanently remove link (POST /recycle-bin/remove)
export const removeLink = async (data: { id?: string; gid?: string; fullShortUrl?: string }): Promise<void> => {
  await apiClient.post('/recycle-bin/remove', data)
}

// Alias for compatibility
export const permanentlyDeleteShortLink = async (data: { id: string }): Promise<void> => {
  await removeLink(data)
}

// Query link statistics (GET /stats with params)
export const queryLinkStats = async (params?: any): Promise<ApiResponse<AnalyticsResponse>> => {
  const response = await apiClient.get<ApiResponse<AnalyticsResponse>>('/stats', { params })
  return response.data
}

// Alias for compatibility
export const getShortLinkAnalytics = async (params?: any): Promise<AnalyticsResponse> => {
  const result = await queryLinkStats(params)
  return result.data
}

// Query link access records (GET /stats/access-record with params)
export const queryLinkTable = async (params?: any): Promise<ApiResponse<any>> => {
  const response = await apiClient.get<ApiResponse<any>>('/stats/access-record', { params })
  return response.data
}
