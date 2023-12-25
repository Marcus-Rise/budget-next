import { NextRequest, NextResponse } from 'next/server';
import { OauthSilentTokenPayload } from '@/oauth/oauth.types';
import { oauthService } from '@/oauth/service';
import { authService } from '@/auth/service';

const AccountLogin = async (req: NextRequest) => {
  const payloadString = req.nextUrl.searchParams.get('payload');

  if (!payloadString) {
    return NextResponse.json({ message: 'No payload' }, { status: 400 });
  }

  const payload: OauthSilentTokenPayload = JSON.parse(payloadString);

  try {
    const oauthCredentials = await oauthService.login(payload);
    const expire = await oauthService.checkAuth(oauthCredentials);

    return authService.login({ ...oauthCredentials, expire }, req);
  } catch (e) {
    console.error(e);

    return authService.logout(req);
  }
};

export { AccountLogin as GET };
