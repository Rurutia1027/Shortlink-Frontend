/**
 * Utility Functions
 */

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
