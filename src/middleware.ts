import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PROTECTED_ROUTES } from '@/constants';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isSignInPage = pathname === '/auth/sign-in';

  const token = await getToken({ req, secret: process.env.CLERK_SECRET_KEY });

  const isAuthPage = pathname.startsWith('/auth');
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  if (token && isAuthPage && !isSignInPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!token && isProtectedRoute && !isSignInPage) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  return NextResponse.next();
}
