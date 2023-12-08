import { NextRequest, NextResponse } from 'next/server';

const AccountLogout = (req: NextRequest) => {
  const response = NextResponse.redirect(new URL('/account/login', req.nextUrl));

  response.cookies.delete('Authorization');
  response.cookies.delete('UserId');

  return response;
};

export { AccountLogout as GET };
