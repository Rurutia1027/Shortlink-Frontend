import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isPublicRoute, hasValidToken } from '@/src/lib/middleware-utils'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes
  if (isPublicRoute(pathname)) {
    // If user is already logged in and tries to access login page, redirect to dashboard
    if (pathname.startsWith('/login') && hasValidToken(request)) {
      return NextResponse.redirect(new URL('/space', request.url))
    }
    return NextResponse.next()
  }

  // Protect all other routes
  if (!hasValidToken(request)) {
    // Redirect to login if not authenticated
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
