import { authService } from '@/auth/service';
import { oauthService } from '@/oauth/service';
import type { AuthRedirectUrl } from '@/auth/service/auth-service.interface';
import { redirect, RedirectType } from 'next/navigation';

const AccountLogout = async () => {
  let redirectUrl: AuthRedirectUrl;

  try {
    const { oauthId } = await authService.getPayload();

    await oauthService.logout(oauthId);

    redirectUrl = await authService.logout('/');
  } catch (e) {
    console.error('LOGOUT ERROR', e);

    redirectUrl = await authService.logout('/');
  }

  redirect(redirectUrl, RedirectType.push);
};

export const dynamic = 'force-dynamic';

export { AccountLogout as GET };
