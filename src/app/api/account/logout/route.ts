import type { NextRequest } from 'next/server';
import { authService } from '@/auth/service';
import { oauthService } from '@/oauth/service';

const AccountLogout = async (req: NextRequest) => {
  try {
    const { oauthId } = await authService.getPayload();

    await oauthService.logout(oauthId);

    return authService.logout(req);
  } catch (e) {
    return authService.logout(req);
  }
};

export const runtime = 'edge';

export { AccountLogout as GET };
