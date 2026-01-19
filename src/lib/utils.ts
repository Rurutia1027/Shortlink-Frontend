/**
 * Utility Functions
 */

import dayjs from 'dayjs'

/**
 * Check if a value is not empty
 * @param value - The value to check
 * @returns true if value is not empty, false otherwise
 */
export const isNotEmpty = (value: any): boolean => {
  if (value === null || value === undefined) {
    return false
  }
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  if (Array.isArray(value)) {
    return value.length > 0
  }
  if (typeof value === 'object') {
    return Object.keys(value).length > 0
  }
  return true
}

/**
 * Check if a value is empty
 * @param value - The value to check
 * @returns true if value is empty, false otherwise
 */
export const isEmpty = (value: any): boolean => {
  return !isNotEmpty(value)
}

/**
 * Get today's date formatted as YYYY-MM-DD
 * @returns Formatted date string
 */
export const getTodayFormatDate = (): string => {
  return dayjs().format('YYYY-MM-DD')
}

/**
 * Get last week's date formatted as YYYY-MM-DD
 * @returns Formatted date string
 */
export const getLastWeekFormatDate = (): string => {
  return dayjs().subtract(7, 'day').format('YYYY-MM-DD')
}

/**
 * Truncate text to a maximum length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return ''
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}
