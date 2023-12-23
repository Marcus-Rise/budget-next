import { NextRequest, NextResponse } from 'next/server';
import { OauthSilentTokenPayload } from '@/oauth/oauth.types';
import { OauthLoginException } from '@/oauth/oauth-login.exception';
import { oauthService } from '@/oauth/oauth.service';

const AccountLogin = async (req: NextRequest) => {
  const payloadString = req.nextUrl.searchParams.get('payload');

  if (!payloadString) {
    return NextResponse.json({ message: 'No payload' }, { status: 400 });
  }

  const payload: OauthSilentTokenPayload = JSON.parse(payloadString);

  try {
    const { accessToken, cookieKey, cookieOptions } = await oauthService.login(payload);
    const returnUrl = req.nextUrl.searchParams.get('returnUrl') || '/';
    const redirectUrl = new URL(returnUrl, req.nextUrl);

    const response = NextResponse.redirect(redirectUrl, { status: 302 });

    response.cookies.set(cookieKey, accessToken, cookieOptions);

    return response;
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
