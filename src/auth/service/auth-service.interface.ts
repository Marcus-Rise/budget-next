import type { NextRequest, NextResponse } from 'next/server';
import type { OauthCredentials } from '@/oauth/oauth.types';

type AuthPayload = { oauthId: OauthCredentials['id'] };

type AuthRedirectUrl = string;

interface IAuthService {
  login(
    payload: AuthPayload & Pick<OauthCredentials, 'expire'>,
    request: NextRequest,
  ): Promise<AuthRedirectUrl>;

  logoutWithResponse(request: NextRequest, returnTo?: string): Promise<NextResponse>;

  logout(returnTo?: string): Promise<AuthRedirectUrl>;

  isAuthed(): Promise<boolean>;

  getPayload(): Promise<AuthPayload>;
}

export type { IAuthService, AuthPayload, AuthRedirectUrl };
