import type { User } from '@/user/user.types';
import type { IAuthService } from '@/auth/service/auth-service.interface';
import type { IUserService } from '@/user/service/user-service.interface';
import type { IOauthService } from '@/oauth/service/oauth-service.interface';
import { redirect } from 'next/navigation';

class UserService implements IUserService {
  constructor(
    private readonly _auth: IAuthService,
    private readonly _oauth: IOauthService,
  ) {}

  async getCurrentUser(): Promise<User> {
    try {
      const { oauthId } = await this._auth.getPayload();
      const { avatar, first_name } = await this._oauth.getProfileInfo(oauthId);

      return {
        name: first_name,
        avatar,
      };
    } catch (error) {
      console.error(error);

      redirect('/api/account/logout');
    }
  }
}

export { UserService };
