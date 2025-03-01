import type {
  OauthAccessCodeResponseDto,
  OauthCredentials,
  OauthProfileInfoResponseDto,
} from '@/oauth/oauth.types';

type OauthId = OauthCredentials['id'];

interface IOauthService {
  getLoginUrl(): Promise<URL>;

  login(payload: OauthAccessCodeResponseDto): Promise<OauthCredentials>;

  getCredentials(oauthId: OauthId): Promise<OauthCredentials>;

  logout(oauthId: OauthId): Promise<void>;

  getProfileInfo(oauthId: OauthId): Promise<OauthProfileInfoResponseDto['user']>;
}

export type { IOauthService, OauthId };
