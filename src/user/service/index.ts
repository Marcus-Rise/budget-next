import { configFactory } from '@/config';
import { authService } from '@/auth/service';
import type { IUserService } from '@/user/service/user-service.interface';
import { UserService } from '@/user/service/user.service';
import { oauthService } from '@/oauth/service';

export const userService: IUserService = new UserService(
  configFactory(),
  authService,
  oauthService,
);
