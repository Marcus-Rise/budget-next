type IJwtConfig = {
  secret: string;
};

type JwtConfigFactory = () => IJwtConfig;

export type { JwtConfigFactory, IJwtConfig };
