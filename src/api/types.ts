// API Response Types

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// User Types
export interface User {
  id: string
  username: string
  email?: string
  createdAt?: string
}

export interface LoginRequest {
  username: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  token: string
  user: User
}

export interface RegisterRequest {
  username: string
  password: string
  email?: string
}

// Group Types
export interface Group {
  id: string
  name: string
  description?: string
  sortOrder?: number
  createdAt?: string
  updatedAt?: string
}

export interface CreateGroupRequest {
  name: string
  description?: string
}

export interface UpdateGroupRequest {
  id: string
  name?: string
  description?: string
}

// Short Link Types
export interface ShortLink {
  id: string
  shortCode: string
  originalUrl: string
  title?: string
  description?: string
  groupId?: string
  groupName?: string
  visitCount?: number
  status?: 'active' | 'deleted'
  createdAt?: string
  updatedAt?: string
  icon?: string
}

export interface CreateShortLinkRequest {
  originalUrl: string
  title?: string
  description?: string
  groupId?: string
  shortCode?: string
}

export interface BatchCreateShortLinkRequest {
  links: Array<{
    originalUrl: string
    title?: string
    description?: string
    groupId?: string
  }>
}

export interface UpdateShortLinkRequest {
  id: string
  originalUrl?: string
  title?: string
  description?: string
  groupId?: string
}

export interface ShortLinkListParams {
  page?: number
  pageSize?: number
  groupId?: string
  keyword?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Analytics Types
export interface AnalyticsData {
  date: string
  count: number
}

export interface AccessLog {
  id: string
  shortLinkId: string
  ip?: string
  userAgent?: string
  referer?: string
  accessedAt: string
}

export interface AnalyticsResponse {
  totalVisits: number
  todayVisits: number
  dateRange: AnalyticsData[]
  accessLogs: AccessLog[]
}
