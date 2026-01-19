import type { NextRequest } from 'next/server'

// Public routes that don't require authentication
export const publicRoutes = ['/login', '/register']

/**
 * Check if a route is public (doesn't require authentication)
 * @param pathname - The route pathname
 * @returns true if the route is public
 */
export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => pathname.startsWith(route))
}

/**
 * Check if user has a valid token in cookies
 * Note: Vue router migrates from localStorage to cookies in beforeEach hook
 * In Next.js, this migration happens in client-side hooks (useAuth)
 * Middleware only checks cookies (server-side)
 * @param request - Next.js request object
 * @returns true if token exists
 */
export function hasValidToken(request: NextRequest): boolean {
  const token = request.cookies.get('token')
  return !!token?.value
}

/**
 * Client-side function to migrate token from localStorage to cookies
 * This matches Vue router behavior: setToken(localStorage.getItem('token'))
 * Call this in client components when needed
 */
export function migrateTokenFromLocalStorage(): void {
  if (typeof window === 'undefined') return
  
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  
  if (token) {
    // Import dynamically to avoid SSR issues
    import('./auth').then(({ setToken }) => {
      setToken(token)
    })
  }
  
  if (username) {
    import('./auth').then(({ setUsername }) => {
      setUsername(username)
    })
  }
}
