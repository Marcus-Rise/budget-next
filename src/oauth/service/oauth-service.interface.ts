import { OauthSilentTokenPayload } from '@/oauth/oauth.types';

type OauthAccessToken = string;
type UserId = number;

type OauthCredentials = { userId: UserId; accessToken: OauthAccessToken };

type OauthCredentialsExpire = Date;

type OauthCredentialsWithExpire = OauthCredentials & { expire: OauthCredentialsExpire };

interface IOauthService {
  login(payload: OauthSilentTokenPayload): Promise<OauthCredentials>;

  checkAuth(credentials: OauthCredentials): Promise<OauthCredentialsExpire>;
}

export type {
  IOauthService,
  OauthAccessToken,
  UserId,
  OauthCredentials,
  OauthCredentialsWithExpire,
  OauthCredentialsExpire,
};
