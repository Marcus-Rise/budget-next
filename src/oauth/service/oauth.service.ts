import 'server-only';
import type { IOauthConfig } from '@/oauth/config';
import type {
  OauthAccessTokenCheckResponseDto,
  OauthAccessTokenResponseDto,
  OauthCredentials,
  OauthSilentTokenPayload,
} from '@/oauth/oauth.types';
import type { IOauthService, OauthId } from '@/oauth/service/oauth-service.interface';
import type { IConfig } from '@/config';
import type { IOauthCredentialsRepository } from '@/oauth/repository';
import { OauthCredentialsDtoFactory } from '@/oauth/oauth-credentials-dto.factory';
import { isAfter } from 'date-fns/isAfter';
import { OauthException } from '@/oauth/oauth.exception';

class OauthService implements IOauthService {
  constructor(
    private readonly _config: IConfig,
    private readonly _oauthConfig: IOauthConfig,
    private readonly _repo: IOauthCredentialsRepository,
  ) {}

  async login(payload: OauthSilentTokenPayload): Promise<OauthCredentials> {
    const requestUrl = new URL('/method/auth.exchangeSilentAuthToken', this._config.apiBaseUrl);
    requestUrl.searchParams.set('v', this._config.apiVersion);
    requestUrl.searchParams.set('token', payload.token);
    requestUrl.searchParams.set('access_token', this._oauthConfig.serviceToken);
    requestUrl.searchParams.set('uuid', payload.uuid);

    const response = await fetch(requestUrl).catch((e: Error) => {
      throw new OauthException(e.message);
    });

    if (!response.ok) {
      throw new OauthException(response.statusText);
    }

    const dto: OauthAccessTokenResponseDto = await response.json();

    if (!dto.response) {
      console.error(dto);

      throw new OauthException('Invalid login response');
    }

    const expire = await this._checkAuth({
      accessToken: dto.response.access_token,
      userId: String(dto.response.user_id),
    }).catch((e: Error) => {
      throw new OauthException(e.message);
    });

    return this._repo
      .create(OauthCredentialsDtoFactory.fromOauthAccessTokenResponseDto(dto.response, expire))
      .catch((e: Error) => {
        throw new OauthException(e.message);
      });
  }

  async getCredentials(oauthId: OauthId): Promise<OauthCredentials> {
    const credentials = await this._repo.find({ id: oauthId });

    if (!credentials) {
      throw new OauthException('no oauth token found');
    }

    if (isAfter(new Date(), credentials.expire)) {
      await this._repo.remove({ id: credentials.tokenId });

      throw new OauthException('expired oauth token');
    }

    return credentials;
  }

  async logout(oauthId: OauthId) {
    await this._repo.remove({ id: oauthId });
  }

  async _checkAuth({
    accessToken,
    userId,
  }: Pick<OauthCredentials, 'userId' | 'accessToken'>): Promise<Date> {
    const requestUrl = new URL('/method/secure.checkToken', this._config.apiBaseUrl);
    requestUrl.searchParams.set('v', this._config.apiVersion);
    requestUrl.searchParams.set('access_token', this._oauthConfig.serviceToken);
    requestUrl.searchParams.set('token', accessToken);

    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new OauthException('Invalid check token response');
    }

    const {
      response: { user_id, expire, date, success },
    }: OauthAccessTokenCheckResponseDto = await response.json();

    if (expire - date <= 0 || success !== 1) {
      throw new OauthException('Expired token');
    }

    if (userId !== String(user_id)) {
      throw new OauthException('Invalid token');
    }

    return new Date(expire * 1000);
  }
}

export { OauthService };
