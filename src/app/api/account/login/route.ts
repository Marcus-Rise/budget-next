import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { OauthAccessCodeResponseDto } from '@/oauth/oauth.types';
import { oauthService } from '@/oauth/service';
import { authService } from '@/auth/service';

const AccountLogin = async (req: NextRequest) => {
  if (req.nextUrl.searchParams.size === 0) {
    return NextResponse.json({ message: 'No payload' }, { status: 400 });
  }

  const payload = Object.fromEntries(
    req.nextUrl.searchParams.entries(),
  ) as OauthAccessCodeResponseDto;

  try {
    const { expire, id } = await oauthService.login(payload);

    return authService.login({ expire, oauthId: id }, req);
  } catch (e) {
    console.error(e);

    return authService.logout();
  }
};

export { AccountLogin as GET };
