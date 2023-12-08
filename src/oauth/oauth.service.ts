import { IOauthConfig } from '@/oauth/config';
import {
  OauthAccessTokenChekResponseDto,
  OauthAccessTokenResponseDto,
  OauthSilentTokenPayload,
} from '@/oauth/oauth.types';
import { OauthLoginException } from '@/oauth/oauth-login.exception';
import { IOauthService } from '@/oauth/oauth-service.interface';
import { IConfig } from '@/config';

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

  async checkToken(accessToken: string) {
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
}

export { OauthService };
