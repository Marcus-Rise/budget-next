import type { NextMiddleware } from 'next/server';
import { NextResponse } from 'next/server';
import { authService } from '@/auth/service';

const middleware: NextMiddleware = async (request) => {
  try {
    const isAuthed = await authService.isAuthed();

    if (request.nextUrl.pathname.startsWith('/account/login')) {
      // public url, must be logged out
      return isAuthed ? NextResponse.redirect(new URL('/', request.nextUrl)) : NextResponse.next();
    }

    // private url, must be logged in, saving requested url to return after login
    return isAuthed ? NextResponse.next() : authService.logout(request, request.nextUrl.pathname);
  } catch (e) {
    console.error(e);

    return authService.logout(request);
  }
};

export const runtime = 'nodejs';

/**
 * @link https://github.com/vercel/next.js/issues/59536
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|manifest.webmanifest|favicon.ico|icon.png|manifest-icon*|icon*|.*js).*)',
  ],
};

export { middleware };
