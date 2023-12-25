import { JwtService } from '@/auth/jwt/jwt.service';
import { IJwtService } from '@/auth/jwt/jwt-service.interface';
import { jwtConfigFactory } from '@/auth/jwt/jwt.config';

export const jwtService: IJwtService = new JwtService(jwtConfigFactory());
