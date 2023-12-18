import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { configFactory } from '@/config';
import { oauthConfigFactory } from '@/oauth/config';
import { OauthService } from '@/oauth/oauth.service';

const middleware = async (request: NextRequest) => {
  const oauthService = new OauthService(configFactory(), oauthConfigFactory());
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
    console.error(e);

    if (typeof e === 'string') {
      // existing redirect
      const redirectUrl = new URL(e, baseUrl);

      return NextResponse.redirect(redirectUrl);
    }

    // general redirect
    return NextResponse.redirect(loginRedirectUrl);
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
    '/((?!api|_next/static|_next/image|manifest.webmanifest|favicon.ico|icon.png*).*)',
  ],
};

export { middleware };
