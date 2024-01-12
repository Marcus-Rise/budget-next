import type { JwtConfigFactory } from '@/auth/jwt/jwt-config.interface';

const jwtConfigFactory: JwtConfigFactory = () => ({
  secret: process.env.JWT_SECRET!,
});

export { jwtConfigFactory };
