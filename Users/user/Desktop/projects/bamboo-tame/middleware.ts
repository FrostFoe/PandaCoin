import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request)

  const { pathname } = request.nextUrl

  // Protected routes for authenticated users
  if (!user && (pathname.startsWith('/dashboard') || pathname.startsWith('/tame') || pathname.startsWith('/pandas') || pathname.startsWith('/settings') || pathname.startsWith('/admin'))) {
    const url = new URL('/login', request.url)
    return NextResponse.redirect(url)
  }

  // Admin route protection
  if (user && pathname.startsWith('/admin')) {
    if (user.email !== process.env.ADMIN_EMAIL) {
      const url = new URL('/dashboard', request.url)
      url.searchParams.set('error', 'unauthorized')
      return NextResponse.redirect(url)
    }
  }

  // Redirect authenticated users from login or root to dashboard
  if (user && (pathname === '/login' || pathname === '/')) {
    const url = new URL('/dashboard', request.url)
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
