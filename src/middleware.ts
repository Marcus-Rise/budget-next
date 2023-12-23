import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { oauthService } from '@/oauth/oauth.service';

const middleware = async (request: NextRequest) => {
  const isAuthed = oauthService.isAuthed();
  const baseUrl = new URL('/', request.url);
  const loginRedirectUrl = new URL('/account/login', request.url);

  if (request.nextUrl.pathname.startsWith('/account/login')) {
    // public url, must be logged out
    return isAuthed ? NextResponse.redirect(baseUrl) : NextResponse.next();
  }

  try {
    await oauthService.checkAuth();

    return NextResponse.next();
  } catch (e: Error | string | any) {
    // failed to log in
    let response: NextResponse<unknown>;

    if (typeof e === 'string') {
      // existing redirect
      const redirectUrl = new URL(e, baseUrl);

      response = NextResponse.redirect(redirectUrl);
    } else {
      console.error(e);

      // general redirect
      response = NextResponse.redirect(loginRedirectUrl);
    }

    response.cookies.delete('Authorization');

    return response;
  }
};

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
    '/((?!api|_next/static|_next/image|manifest.webmanifest|favicon.ico|icon.png|.*js).*)',
  ],
};

export { middleware };
