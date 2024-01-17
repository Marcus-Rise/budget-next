import type { AccessToken, IJwtService, JwtPayload } from '@/auth/jwt/jwt-service.interface';
import { jwtVerify, SignJWT } from 'jose';
import type { IJwtConfig } from '@/auth/jwt/jwt-config.interface';
import { JwtException } from '@/auth/jwt/jwt.exception';
import { JWT_ERROR_MESSAGE } from '@/auth/jwt/jwt.constants';

class JwtService implements IJwtService {
  constructor(private readonly _config: IJwtConfig) {}

  private get _secret() {
    return new TextEncoder().encode(this._config.secret);
  }

  async sign<Payload extends JwtPayload = JwtPayload>(
    payload: Payload,
    expire: Date,
  ): Promise<AccessToken> {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime(expire)
      .sign(this._secret);
  }

  async verify<Payload extends JwtPayload = JwtPayload>(token: AccessToken): Promise<Payload> {
    try {
      const { payload } = await jwtVerify(token, this._secret);

      return payload as Payload;
    } catch (e) {
      console.error(e);

      throw new JwtException(JWT_ERROR_MESSAGE);
    }
  }
}

export { JwtService };
