type IConfig = {
  canonicalBaseUrl: URL;
  apiBaseUrl: string;
  apiVersion: string;
};

type ConfigFactory = () => IConfig;

export type { IConfig, ConfigFactory };
