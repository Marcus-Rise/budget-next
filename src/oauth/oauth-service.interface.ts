import { OauthSilentTokenPayload } from '@/oauth/oauth.types';

type AccessToken = string;
type UserId = number;

interface IOauthService {
  login(payload: OauthSilentTokenPayload): Promise<AccessToken>;

  checkToken(accessToken: AccessToken): Promise<UserId>;
}

export type { IOauthService };
