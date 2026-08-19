// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES = ['/dashboard', '/campaigns', '/reports', '/account']
const AUTH_ROUTES = ['/login', '/register']

export function middleware(request: NextRequest) {
  // The app never sets an "accessToken" cookie - the access token lives only in
  // memory (Redux). The httpOnly "refreshToken" cookie is the actual session marker.
  const token = request.cookies.get('refreshToken')?.value
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route)

  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/campaigns/:path*',
    '/reports/:path*',
    '/account/:path*',
    '/login',
    '/register',
  ],
}
