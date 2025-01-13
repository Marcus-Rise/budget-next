type IConfig = {
  canonicalBaseUrl: URL;
};

type ConfigFactory = () => IConfig;

export type { IConfig, ConfigFactory };
