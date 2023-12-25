import { IAuthService } from '@/auth/service/auth-service.interface';
import { AuthService } from '@/auth/service/auth.service';

export const authService: IAuthService = new AuthService();
