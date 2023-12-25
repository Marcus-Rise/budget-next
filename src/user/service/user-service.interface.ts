import { User } from '@/user/user.types';

interface IUserService {
  getCurrentUser(): Promise<User>;
}

export type { IUserService };
