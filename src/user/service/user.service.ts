import type { User, UserGetResponseDto } from '@/user/user.types';
import type { IConfig } from '@/config';
import type { IAuthService } from '@/auth/service/auth-service.interface';
import type { IUserService } from '@/user/service/user-service.interface';
import type { IOauthService } from '@/oauth/service/oauth-service.interface';

class UserService implements IUserService {
  constructor(
    private readonly _config: IConfig,
    private readonly _auth: IAuthService,
    private readonly _oauth: IOauthService,
  ) {}

  async getCurrentUser(): Promise<User> {
    const { oauthId } = await this._auth.getPayload();
    const { accessToken } = await this._oauth.getCredentials(oauthId);

    const requestUrl = new URL('/method/users.get', this._config.apiBaseUrl);
    requestUrl.searchParams.set('v', this._config.apiVersion);
    requestUrl.searchParams.append('fields', 'photo');

    const response = await fetch(requestUrl, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
    const dto: UserGetResponseDto = await response.json();

    const { first_name, photo } = dto.response.at(0)!;

    return {
      name: first_name,
      avatar: photo,
    };
  }
}

export { UserService };
