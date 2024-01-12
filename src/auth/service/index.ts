import type { IAuthService } from '@/auth/service/auth-service.interface';
import { AuthService } from '@/auth/service/auth.service';
import { jwtService } from '@/auth/jwt';

export const authService: IAuthService = new AuthService(jwtService);
