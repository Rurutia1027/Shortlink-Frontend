// API Response Types

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  list?: T[]
  records?: T[]
  total: number
  page?: number
  current?: number
  pageSize?: number
  size?: number
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
  id?: string
  gid?: string
  name: string
  title?: string
  description?: string
  sortOrder?: number
  shortLinkCount?: number | null
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
  id?: string
  gid?: string
  shortCode?: string
  shortUri?: string
  fullShortUrl?: string
  domain?: string
  originalUrl?: string
  originUrl?: string
  title?: string
  describe?: string
  description?: string
  groupId?: string
  groupName?: string
  visitCount?: number
  status?: 'active' | 'deleted'
  createdAt?: string
  createTime?: string
  updatedAt?: string
  icon?: string
  favicon?: string
  validDate?: string
  validDateType?: number
  enableStatus?: number
  todayPv?: number
  totalPv?: number
  todayUv?: number
  totalUv?: number
  todayUip?: number
  totalUip?: number
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
  current?: number
  size?: number
  gid?: string | null
  groupId?: string
  keyword?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  orderTag?: string | null
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
