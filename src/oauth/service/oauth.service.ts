import 'server-only';
import { IOauthConfig } from '@/oauth/config';
import {
  OauthAccessTokenCheckResponseDto,
  OauthAccessTokenResponseDto,
  OauthSilentTokenPayload,
} from '@/oauth/oauth.types';
import { OauthLoginException } from '@/oauth/oauth-login.exception';
import {
  IOauthService,
  OauthCredentials,
  OauthCredentialsExpire,
} from '@/oauth/service/oauth-service.interface';
import { IConfig } from '@/config';

class OauthService implements IOauthService {
  constructor(
    private readonly _config: IConfig,
    private readonly _oauthConfig: IOauthConfig,
  ) {}

  async login(payload: OauthSilentTokenPayload): Promise<OauthCredentials> {
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

      throw new OauthLoginException('Invalid login response');
    }

    return {
      accessToken: dto.response.access_token,
      userId: dto.response.user_id,
    };
  }

  async checkAuth({ accessToken, userId }: OauthCredentials): Promise<OauthCredentialsExpire> {
    const requestUrl = new URL('/method/secure.checkToken', this._config.apiBaseUrl);
    requestUrl.searchParams.set('v', this._config.apiVersion);
    requestUrl.searchParams.set('access_token', this._oauthConfig.serviceToken);
    requestUrl.searchParams.set('token', accessToken);

    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new OauthLoginException('Invalid check token response');
    }

    const {
      response: { user_id, expire, date, success },
    }: OauthAccessTokenCheckResponseDto = await response.json();

    if (expire - date <= 0 || success !== 1) {
      throw new OauthLoginException('Expired token');
    }

    if (userId !== user_id) {
      throw new OauthLoginException('Invalid token');
    }

    return new Date(expire * 1000);
  }
}

export { OauthService };
