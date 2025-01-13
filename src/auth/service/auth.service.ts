import 'server-only';
import type { AuthPayload, IAuthService } from '@/auth/service/auth-service.interface';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { IJwtService } from '@/auth/jwt/jwt-service.interface';
import type { OauthCredentials } from '@/oauth/oauth.types';
import type { CookieOptions } from 'express';
import { redirect } from 'next/navigation';

class AuthService implements IAuthService {
  private static _COOKIE_KEY = 'Authorization';

  constructor(private readonly _jwt: IJwtService) {}

  async getPayload(): Promise<AuthPayload> {
    const cookie = cookies().get(AuthService._COOKIE_KEY)?.value!;

    return this._jwt.verify<AuthPayload>(cookie);
  }

  async isAuthed(): Promise<boolean> {
    const token = cookies().get(AuthService._COOKIE_KEY)?.value;

    if (!token) {
      return false;
    }

    return !!(await this._jwt.verify(token));
  }

  async login(
    { expire, ...payload }: AuthPayload & Pick<OauthCredentials, 'expire'>,
    request: NextRequest,
  ): Promise<NextResponse> {
    const returnUrl = request.nextUrl.searchParams.get('returnUrl') || '/';
    const redirectUrl = new URL(returnUrl, request.nextUrl);

    const response = NextResponse.redirect(redirectUrl, { status: 302 });

    const cookieOptions: Partial<CookieOptions> = {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      expires: expire,
    };

    const token = await this._jwt.sign(payload, expire);

    response.cookies.set(AuthService._COOKIE_KEY, token, cookieOptions);

    return response;
  }

  async logoutWithResponse(request: NextRequest, returnUrl: string = '/'): Promise<NextResponse> {
    const redirectUrl = new URL(`/account/login`, request.nextUrl);
    redirectUrl.searchParams.set('returnUrl', encodeURIComponent(returnUrl));

    const response = NextResponse.redirect(redirectUrl);

    response.cookies.delete(AuthService._COOKIE_KEY);

    return response;
  }

  async logout(returnUrl: string = '/'): Promise<void> {
    const searchParams = new URLSearchParams();
    searchParams.set('returnUrl', encodeURIComponent(returnUrl));

    cookies().delete(AuthService._COOKIE_KEY);

    redirect('/account/login?=' + searchParams.toString());
  }
}

export { AuthService };
