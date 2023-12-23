import 'server-only';
import { IOauthConfig, oauthConfigFactory } from '@/oauth/config';
import {
  OauthAccessTokenCheckResponseDto,
  OauthAccessTokenResponseDto,
  OauthSilentTokenPayload,
} from '@/oauth/oauth.types';
import { OauthLoginException } from '@/oauth/oauth-login.exception';
import { AccessToken, IOauthService, UserId } from '@/oauth/oauth-service.interface';
import { configFactory, IConfig } from '@/config';
import { cookies, headers } from 'next/headers';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

class OauthService implements IOauthService {
  constructor(
    private readonly _config: IConfig,
    private readonly _oauthConfig: IOauthConfig,
  ) {}

  async login(payload: OauthSilentTokenPayload): Promise<{
    accessToken: AccessToken;
    userId: UserId;
    cookieKey: string;
    cookieOptions: Partial<ResponseCookie>;
  }> {
    const requestUrl = new URL('/method/auth.exchangeSilentAuthToken', this._config.apiBaseUrl);
    requestUrl.searchParams.set('v', this._config.apiVersion);
    requestUrl.searchParams.set('token', payload.token);
    requestUrl.searchParams.set('access_token', this._oauthConfig.serviceToken);
    requestUrl.searchParams.set('uuid', payload.uuid);

    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new OauthLoginException(response.statusText);
    }

    const dto: OauthAccessTokenResponseDto = await response.json();

    if (!dto.response) {
      console.error(dto);

      throw new OauthLoginException('Invalid oauth response');
    }

    const { expire } = await this._checkToken(dto.response.access_token);

    const cookieOptions: Partial<ResponseCookie> = {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      expires: expire,
    };

    return {
      accessToken: dto.response.access_token,
      userId: dto.response.user_id,
      cookieKey: OauthService._COOKIE_KEY,
      cookieOptions,
    };
  }

  isAuthed() {
    const auth = this._getAccessToken();

    return !!auth;
  }

  async checkAuth() {
    const accessToken = this._getAccessToken();
    const returnUrl = encodeURIComponent(headers().get('x-invoke-path') || '/');
    const redirectUrl = `/account/login?returnUrl=${returnUrl}`;

    if (!accessToken) {
      throw redirectUrl;
    }

    return this._checkToken(accessToken);
  }

  private async _checkToken(accessToken: string) {
    const requestUrl = new URL('/method/secure.checkToken', this._config.apiBaseUrl);
    requestUrl.searchParams.set('v', this._config.apiVersion);
    requestUrl.searchParams.set('access_token', this._oauthConfig.serviceToken);
    requestUrl.searchParams.set('token', accessToken);

    const response = await fetch(requestUrl, { cache: 'force-cache' });

    if (!response.ok) {
      throw new OauthLoginException('Invalid token');
    }

    const {
      response: { user_id, expire, date, success },
    }: OauthAccessTokenCheckResponseDto = await response.json();

    if (expire - date <= 0 || success !== 1) {
      throw new OauthLoginException('Expired token');
    }

    return { userId: user_id, accessToken, expire: new Date(expire * 1000) };
  }

  private _getAccessToken() {
    return cookies().get(OauthService._COOKIE_KEY)?.value;
  }

  private static _COOKIE_KEY = 'Authorization';
}

export const oauthService: IOauthService = new OauthService(configFactory(), oauthConfigFactory());
