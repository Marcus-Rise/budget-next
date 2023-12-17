type IConfig = {
  baseUrl: URL;
  apiBaseUrl: string;
  apiVersion: string;
  mongoUrl: string;
};

type ConfigFactory = () => IConfig;

export type { IConfig, ConfigFactory };
