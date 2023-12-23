import { User, UserGetResponseDto } from '@/user/user.types';
import { configFactory, IConfig } from '@/config';
import { IOauthService } from '@/oauth/oauth-service.interface';
import { oauthService } from '@/oauth/oauth.service';

class UserService {
  constructor(
    private readonly _config: IConfig,
    private readonly _oauth: IOauthService,
  ) {}

  async getCurrentUser(): Promise<User> {
    const { accessToken } = await this._oauth.checkAuth();

    const requestUrl = new URL('/method/users.get', this._config.apiBaseUrl);
    requestUrl.searchParams.set('v', this._config.apiVersion);
    requestUrl.searchParams.set('access_token', accessToken);
    requestUrl.searchParams.append('fields', 'photo');

    const response = await fetch(requestUrl);
    const dto: UserGetResponseDto = await response.json();

    const { first_name, photo } = dto.response.at(0)!;

    return {
      name: first_name,
      avatar: photo,
    };
  }
}

export const userService = new UserService(configFactory(), oauthService);
