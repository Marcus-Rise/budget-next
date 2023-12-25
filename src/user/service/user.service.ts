import { User, UserGetResponseDto } from '@/user/user.types';
import { IConfig } from '@/config';
import { IAuthService } from '@/auth/service/auth-service.interface';
import { IUserService } from '@/user/service/user-service.interface';

class UserService implements IUserService {
  constructor(
    private readonly _config: IConfig,
    private readonly _auth: IAuthService,
  ) {}

  async getCurrentUser(): Promise<User> {
    const { accessToken } = await this._auth.getOauthCredentials();

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
