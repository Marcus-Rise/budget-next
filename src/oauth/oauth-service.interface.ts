import { OauthSilentTokenPayload } from '@/oauth/oauth.types';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

type AccessToken = string;
type UserId = number;

interface IOauthService {
  login(payload: OauthSilentTokenPayload): Promise<{
    accessToken: AccessToken;
    userId: UserId;
    cookieKey: string;
    cookieOptions: Partial<ResponseCookie>;
  }>;

  isAuthed(): boolean;

  checkAuth(): Promise<{ userId: UserId; accessToken: AccessToken }>;
}

export type { IOauthService, AccessToken, UserId };
