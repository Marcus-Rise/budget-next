import type { NextRequest, NextResponse } from 'next/server';
import type { OauthCredentials } from '@/oauth/oauth.types';

type AuthPayload = { oauthId: OauthCredentials['id'] };

interface IAuthService {
  login(
    payload: AuthPayload & Pick<OauthCredentials, 'expire'>,
    request: NextRequest,
  ): Promise<NextResponse>;

  logoutWithResponse(request: NextRequest, returnUrl?: string): Promise<NextResponse>;

  logout(returnUrl?: string): Promise<void>;

  isAuthed(): Promise<boolean>;

  getPayload(): Promise<AuthPayload>;
}

export type { IAuthService, AuthPayload };
