import { NextRequest } from 'next/server';
import { authService } from '@/auth/service';

const AccountLogout = (req: NextRequest) => authService.logout(req);

export const runtime = 'nodejs';

export { AccountLogout as GET };
