import type { OauthCredentials, OauthSilentTokenPayload } from '@/oauth/oauth.types';

type OauthId = OauthCredentials['id'];

interface IOauthService {
  login(payload: OauthSilentTokenPayload): Promise<OauthCredentials>;

  getCredentials(oauthId: OauthId): Promise<OauthCredentials>;

  logout(oauthId: OauthId): Promise<void>;
}

export type { IOauthService, OauthId };
