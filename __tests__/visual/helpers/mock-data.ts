import type { Group, User, ShortLink } from '@/src/api/types'

/**
 * Mock data for visual regression tests
 * Shared across all visual tests
 */

export const mockGroups: Group[] = [
  {
    id: '1',
    gid: 'group1',
    name: 'Default Group',
    title: 'Default Group',
    description: 'Default group for short links',
    sortOrder: 1,
    shortLinkCount: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    gid: 'group2',
    name: 'Work',
    title: 'Work',
    description: 'Work related links',
    sortOrder: 2,
    shortLinkCount: 3,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    gid: 'group3',
    name: 'Personal',
    title: 'Personal',
    description: 'Personal links',
    sortOrder: 3,
    shortLinkCount: 2,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
]

export const mockUser: User = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  phone: '1234567890',
  realName: 'Test User',
  createdAt: '2024-01-01T00:00:00Z',
}

export const mockShortLink: ShortLink = {
  id: '1',
  gid: 'group1',
  shortCode: 'abc123',
  shortUri: '/abc123',
  fullShortUrl: 'https://shortlink.tus/abc123',
  domain: 'shortlink.tus',
  originalUrl: 'https://example.com/page1',
  originUrl: 'https://example.com/page1',
  title: 'Example Page 1',
  describe: 'Example Page 1',
  description: 'Example Page 1',
  groupId: 'group1',
  groupName: 'Default Group',
  visitCount: 100,
  status: 'active',
  createdAt: '2024-01-01T00:00:00Z',
  createTime: '2024-01-01T00:00:00Z',
  todayPv: 10,
  totalPv: 100,
  todayUv: 8,
  totalUv: 80,
  todayUip: 5,
  totalUip: 50,
}
