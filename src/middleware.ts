import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { configFactory } from '@/config';
import { oauthConfigFactory } from '@/oauth/config';
import { OauthService } from '@/oauth/oauth.service';

const middleware = async (request: NextRequest) => {
  const oauthService = new OauthService(configFactory(), oauthConfigFactory());

  const baseUrl = new URL(request.nextUrl.protocol + request.nextUrl.host).href;

  if (request.nextUrl.pathname === '/') {
    // need to log in
    try {
      await oauthService.checkAuth();

      // allow entry
      return NextResponse.next();
    } catch (e) {
      // failed to log in
      console.error(e);

      if (typeof e === 'string') {
        // existing redirect
        const redirectUrl = new URL(e, baseUrl);

        return NextResponse.redirect(redirectUrl.href);
      }

      //general redirect
      const redirectUrl = new URL('/account/login', baseUrl);

      return NextResponse.redirect(redirectUrl.href);
    }
  } else if (request.nextUrl.pathname === '/account/login') {
    // public url, must be logged out
    const isAuthed = oauthService.isAuthed();

    if (isAuthed) {
      // logged in, redirect to home page
      const redirectUrl = new URL('/', baseUrl);

      return NextResponse.redirect(redirectUrl.href);
    }

    // logged out, allow to entry
    return NextResponse.next();
  } else {
    // some unhanding url, allow entry
    return NextResponse.next();
  }
};

const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export { config, middleware };
