import { AccessToken, IJwtService, JwtPayload } from '@/auth/jwt/jwt-service.interface';
import jwt from 'jsonwebtoken';
import { IJwtConfig } from '@/auth/jwt/jwt-config.interface';
import { differenceInDays } from 'date-fns/differenceInDays';
import { JwtException } from '@/auth/jwt/jwt.exception';
import { JWT_ERROR_MESSAGE } from '@/auth/jwt/jwt.constants';

class JwtService implements IJwtService {
  constructor(private readonly _config: IJwtConfig) {}

  async sign<Payload extends JwtPayload = JwtPayload>(
    payload: Payload,
    expire: Date,
  ): Promise<AccessToken> {
    const expiredInDays = differenceInDays(expire, new Date());

    return jwt.sign(payload, this._config.secret, {
      expiresIn: `${expiredInDays}d`,
    });
  }

  async verify<Payload extends JwtPayload = JwtPayload>(token: AccessToken): Promise<Payload> {
    try {
      return jwt.verify(token, this._config.secret) as Payload;
    } catch (e) {
      console.error(e);

      throw new JwtException(JWT_ERROR_MESSAGE);
    }
  }
}

export { JwtService };
