import { NextRequest, NextResponse } from 'next/server';
import { OauthSilentTokenPayload } from '@/oauth/oauth.types';
import { oauthConfigFactory } from '@/oauth/config';
import { OauthService } from '@/oauth/oauth.service';
import { OauthLoginException } from '@/oauth/oauth-login.exception';
import { cookies } from 'next/headers';
import addYears from 'date-fns/addYears';
import { configFactory } from '@/config';

const AccountLogin = async (req: NextRequest) => {
  const payloadString = req.nextUrl.searchParams.get('payload');

  if (!payloadString) {
    return NextResponse.json({ message: 'No payload' }, { status: 400 });
  }

  const payload: OauthSilentTokenPayload = JSON.parse(payloadString);

  const service = new OauthService(configFactory(), oauthConfigFactory());

  try {
    const accessToken = await service.login(payload);

    cookies().set('Authorization', accessToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      expires: addYears(new Date(), 1),
    });

    const returnUrl = req.nextUrl.searchParams.get('returnUrl') || '/';

    const redirectUrl = new URL(returnUrl, req.nextUrl);

    return NextResponse.redirect(redirectUrl);
  } catch (e) {
    if (e instanceof OauthLoginException) {
      return NextResponse.json(
        {
          message: e.message,
        },
        {
          status: 401,
        },
      );
    }

    console.error(e);

    return NextResponse.json(
      {
        message: e,
      },
      {
        status: 500,
      },
    );
  }
};

export { AccountLogin as GET };
