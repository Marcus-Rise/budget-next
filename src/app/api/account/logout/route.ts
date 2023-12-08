import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const AccountLogout = (req: NextRequest) => {
  cookies().delete('Authorization');

  return NextResponse.redirect(new URL('/account/login', req.nextUrl));
};

export { AccountLogout as GET };
