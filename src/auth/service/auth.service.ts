import 'server-only';
import type { IAuthService } from '@/auth/service/auth-service.interface';
import type {
  OauthCredentials,
  OauthCredentialsWithExpire,
} from '@/oauth/service/oauth-service.interface';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import type { IJwtService } from '@/auth/jwt/jwt-service.interface';

class AuthService implements IAuthService {
  private static _COOKIE_KEY = 'Authorization';

  constructor(private readonly _jwt: IJwtService) {}

  async getOauthCredentials(): Promise<OauthCredentials> {
    const cookie = cookies().get(AuthService._COOKIE_KEY)?.value!;

    return this._jwt.verify<OauthCredentials>(cookie);
  }

  async isAuthed(): Promise<boolean> {
    const token = cookies().get(AuthService._COOKIE_KEY)?.value;

    if (!token) {
      return false;
    }

    return this._jwt.verify(token);
  }

  async login(
    { expire, ...credentials }: OauthCredentialsWithExpire,
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

    const token = await this._jwt.sign<OauthCredentials>(credentials, expire);

    response.cookies.set(AuthService._COOKIE_KEY, token, cookieOptions);

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
