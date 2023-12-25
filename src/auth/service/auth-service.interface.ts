import {
  OauthCredentials,
  OauthCredentialsWithExpire,
} from '@/oauth/service/oauth-service.interface';
import { NextRequest, NextResponse } from 'next/server';

interface IAuthService {
  login(oauthCredentials: OauthCredentialsWithExpire, request: NextRequest): Promise<NextResponse>;

  logout(request: NextRequest, returnUrl?: string): Promise<NextResponse>;

  isAuthed(): Promise<boolean>;

  getOauthCredentials(): Promise<OauthCredentials>;
}

export type { IAuthService };
