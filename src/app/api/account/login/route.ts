import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { OauthSilentTokenPayload } from '@/oauth/oauth.types';
import { oauthService } from '@/oauth/service';
import { authService } from '@/auth/service';

const AccountLogin = async (req: NextRequest) => {
  const payloadString = req.nextUrl.searchParams.get('payload');

  if (!payloadString) {
    return NextResponse.json({ message: 'No payload' }, { status: 400 });
  }

  const payload: OauthSilentTokenPayload = JSON.parse(payloadString);

  try {
    const { expire, id } = await oauthService.login(payload);

    return authService.login({ expire, oauthId: id }, req);
  } catch (e) {
    console.error(e);

    return authService.logout(req);
  }
};

export const runtime = 'edge';

export { AccountLogin as GET };
