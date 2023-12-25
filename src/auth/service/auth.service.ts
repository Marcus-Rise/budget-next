import 'server-only';
import { IAuthService } from '@/auth/service/auth-service.interface';
import {
  OauthCredentials,
  OauthCredentialsWithExpire,
} from '@/oauth/service/oauth-service.interface';
import { NextRequest, NextResponse } from 'next/server';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

class AuthService implements IAuthService {
  private static _COOKIE_KEY = 'Authorization';

  async getOauthCredentials(): Promise<OauthCredentials> {
    const token = cookies().get(AuthService._COOKIE_KEY)?.value!;

    return {
      accessToken: token,
      userId: 0,
    };
  }

  async isAuthed(): Promise<boolean> {
    return !!cookies().get(AuthService._COOKIE_KEY)?.value;
  }

  async login(
    { accessToken, expire }: OauthCredentialsWithExpire,
    request: NextRequest,
  ): Promise<NextResponse> {
    const returnUrl = request.nextUrl.searchParams.get('returnUrl') || '/';
    const redirectUrl = new URL(returnUrl, request.nextUrl);

    const response = NextResponse.redirect(redirectUrl, { status: 302 });

    const cookieOptions: Partial<ResponseCookie> = {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      expires: expire,
    };

    response.cookies.set(AuthService._COOKIE_KEY, accessToken, cookieOptions);

    return response;
  }

  async logout(request: NextRequest, returnUrl: string = '/'): Promise<NextResponse> {
    const redirectUrl = new URL(`/account/login`, request.nextUrl);
    redirectUrl.searchParams.set('returnUrl', encodeURIComponent(returnUrl));

    const response = NextResponse.redirect(redirectUrl);

    response.cookies.delete(AuthService._COOKIE_KEY);

    return response;
  }
}

export { AuthService };
