import { JwtService } from '@/auth/jwt/jwt.service';
import type { IJwtService } from '@/auth/jwt/jwt-service.interface';
import { jwtConfigFactory } from '@/auth/jwt/jwt.config';

export const jwtService: IJwtService = new JwtService(jwtConfigFactory());
