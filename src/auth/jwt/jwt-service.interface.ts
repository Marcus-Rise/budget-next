type JwtPayload = {};
type AccessToken = string;

interface IJwtService {
  sign<Payload extends JwtPayload = JwtPayload>(
    payload: Payload,
    expire: Date,
  ): Promise<AccessToken>;

  verify<Payload extends JwtPayload = JwtPayload>(token: AccessToken): Promise<Payload>;
}

export type { IJwtService, JwtPayload, AccessToken };
