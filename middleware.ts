import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/signup', '/auth/wallet', '/'];

  const pathname = request.nextUrl.pathname;
  
  // Check if this is a public route
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Get the auth token from cookies
  const token = request.cookies.get('auth-token')?.value;

  // If no token and trying to access protected route, redirect to login
  if (!token && pathname.startsWith('/')) {
    // Allow API routes to fail naturally
    if (pathname.startsWith('/api/')) {
      return NextResponse.next();
    }
    
    // Redirect to login for protected routes
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files and images
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg).*)',
  ]
};
