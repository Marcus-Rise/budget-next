import { User, UserGetResponseDto } from '@/user/user.types';
import { IConfig } from '@/config';

class UserService {
  constructor(private readonly _config: IConfig) {}

  async getCurrentUser(accessToken: string): Promise<User> {
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

export { UserService };
