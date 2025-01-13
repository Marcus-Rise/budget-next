import 'server-only';
import type { IOauthConfig } from '@/oauth/config';
import type {
  OauthAccessCodeResponseDto,
  OauthAccessTokenResponseDto,
  OauthCredentials,
  OauthProfileInfoResponseDto,
  OauthResponseError,
} from '@/oauth/oauth.types';
import type { IOauthService, OauthId } from '@/oauth/service/oauth-service.interface';
import type { IOauthCredentialsRepository } from '@/oauth/repository';
import { OauthCredentialsDtoFactory } from '@/oauth/oauth-credentials-dto.factory';
import { isAfter } from 'date-fns/isAfter';
import { OauthException } from '@/oauth/oauth.exception';
import { computeCodeChallengeFromVerifier } from '@/oauth/oauth.helper';
import { v4 as uuid } from 'uuid';

class OauthService implements IOauthService {
  constructor(
    private readonly _oauthConfig: IOauthConfig,
    private readonly _repo: IOauthCredentialsRepository,
  ) {}

  async getLoginUrl(): Promise<URL> {
    const { appId, codeVerifier, redirectUrl, apiUrl } = this._oauthConfig;

    const loginLink = new URL('/authorize', apiUrl);

    loginLink.searchParams.set('response_type', 'code');
    loginLink.searchParams.set('client_id', appId);
    loginLink.searchParams.set('redirect_uri', redirectUrl.href);
    loginLink.searchParams.set(
      'code_challenge',
      await computeCodeChallengeFromVerifier(codeVerifier),
    );
    loginLink.searchParams.set('code_challenge_method', 's256');
    loginLink.searchParams.set('state', uuid());

    return loginLink;
  }

  async login({ code, state, device_id }: OauthAccessCodeResponseDto): Promise<OauthCredentials> {
    const { codeVerifier, apiUrl, redirectUrl, appId, serviceToken } = this._oauthConfig;

    const response = await fetch(new URL('/oauth2/auth', apiUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code_verifier: codeVerifier,
        redirect_uri: redirectUrl.href,
        code,
        service_token: serviceToken,
        client_id: appId,
        device_id,
        state,
      }),
    });

    const dto: OauthAccessTokenResponseDto | OauthResponseError = await response.json();

    if ('error' in dto) {
      throw new OauthException(JSON.stringify(dto));
    }

    return this._repo.create(OauthCredentialsDtoFactory.fromOauthAccessTokenResponseDto(dto));
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
    const credentials = await this._repo.find({ id: oauthId });

    if (!credentials) {
      throw new OauthException('no oauth token found');
    }

    const { apiUrl, appId } = this._oauthConfig;

    const response = await fetch(new URL('/oauth2/logout', apiUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        access_token: credentials.accessToken,
        client_id: appId,
      }),
    });

    const dto: OauthAccessTokenResponseDto | OauthResponseError = await response.json();

    if ('error' in dto) {
      throw new OauthException(JSON.stringify(dto));
    }

    await this._repo.remove({ id: oauthId });
  }

  async getProfileInfo(oauthId: OauthId): Promise<OauthProfileInfoResponseDto['user']> {
    const { apiUrl, appId } = this._oauthConfig;
    const { tokenId } = await this.getCredentials(oauthId);

    const response = await fetch(new URL('/oauth2/public_info', apiUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        id_token: tokenId,
        client_id: appId,
      }),
    });

    const dto: OauthProfileInfoResponseDto | OauthResponseError = await response.json();

    if ('error' in dto) {
      throw new OauthException(JSON.stringify(dto));
    }

    return dto.user;
  }
}

export { OauthService };
