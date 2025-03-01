import 'server-only';
import type {
  AuthPayload,
  AuthRedirectUrl,
  IAuthService,
} from '@/auth/service/auth-service.interface';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { IJwtService } from '@/auth/jwt/jwt-service.interface';
import type { OauthCredentials } from '@/oauth/oauth.types';

class AuthService implements IAuthService {
  private static _COOKIE_KEY = 'Authorization';
  private static _RETURN_URL_KEY = 'returnUrl';

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
  ): Promise<AuthRedirectUrl> {
    const token = await this._jwt.sign(payload, expire);

    cookies().set(AuthService._COOKIE_KEY, token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      expires: expire,
    });

    return request.nextUrl.searchParams.get(AuthService._RETURN_URL_KEY) || '/';
  }

  async logoutWithResponse(request: NextRequest, returnTo: string = '/'): Promise<NextResponse> {
    const redirectUrl = new URL(`/account/login`, request.nextUrl);
    redirectUrl.searchParams.set(AuthService._RETURN_URL_KEY, encodeURIComponent(returnTo));

    const response = NextResponse.redirect(redirectUrl);

    response.cookies.delete(AuthService._COOKIE_KEY);

    return response;
  }

  async logout(returnUrl: string = '/'): Promise<AuthRedirectUrl> {
    const searchParams = new URLSearchParams();
    searchParams.set(AuthService._RETURN_URL_KEY, encodeURIComponent(returnUrl));

    cookies().delete(AuthService._COOKIE_KEY);

    return '/account/login?' + searchParams.toString();
  }
}

export { AuthService };
