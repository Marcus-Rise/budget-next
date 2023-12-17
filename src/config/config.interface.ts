type IConfig = {
  baseUrl: URL;
  apiBaseUrl: string;
  apiVersion: string;
};

type ConfigFactory = () => IConfig;

export type { IConfig, ConfigFactory };
