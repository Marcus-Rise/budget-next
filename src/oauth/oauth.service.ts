import 'server-only';
import { IOauthConfig } from '@/oauth/config';
import {
  OauthAccessTokenChekResponseDto,
  OauthAccessTokenResponseDto,
  OauthSilentTokenPayload,
} from '@/oauth/oauth.types';
import { OauthLoginException } from '@/oauth/oauth-login.exception';
import { IOauthService } from '@/oauth/oauth-service.interface';
import { IConfig } from '@/config';
import { cookies, headers } from 'next/headers';

class OauthService implements IOauthService {
  constructor(
    private readonly _config: IConfig,
    private readonly _oauthConfig: IOauthConfig,
  ) {}

  async login(payload: OauthSilentTokenPayload) {
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

    return { accessToken: dto.response.access_token, userId: dto.response.user_id };
  }

  private async checkToken(accessToken: string) {
    const requestUrl = new URL('/method/secure.checkToken', this._config.apiBaseUrl);
    requestUrl.searchParams.set('v', this._config.apiVersion);
    requestUrl.searchParams.set('access_token', this._oauthConfig.serviceToken);
    requestUrl.searchParams.set('token', accessToken);

    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new OauthLoginException('Invalid token');
    }

    const {
      response: { user_id, expire, date, success },
    }: OauthAccessTokenChekResponseDto = await response.json();

    if (expire - date <= 0 || success !== 1) {
      throw new OauthLoginException('Expired token');
    }

    return user_id;
  }

  async checkAuth() {
    const auth = cookies().get('Authorization');
    const userId = cookies().get('UserId');
    const returnUrl = encodeURIComponent(headers().get('x-invoke-path') || '/');
    const redirectUrl = `/account/login?returnUrl=${returnUrl}`;

    if (!auth || !userId) {
      throw redirectUrl;
    }

    const freshUserId = await this.checkToken(auth.value);

    if (String(freshUserId) !== userId.value) {
      throw redirectUrl;
    }
  }

  isAuthed() {
    const auth = cookies().get('Authorization');
    const userId = cookies().get('UserId');

    return !!auth?.value && !!userId?.value;
  }
}

export { OauthService };
