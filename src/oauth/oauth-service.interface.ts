import { OauthSilentTokenPayload } from '@/oauth/oauth.types';

type AccessToken = string;
type UserId = number;

interface IOauthService {
  login(payload: OauthSilentTokenPayload): Promise<{ accessToken: AccessToken; userId: UserId }>;

  isAuthed(): boolean;

  checkAuth(): Promise<void>;
}

export type { IOauthService };
