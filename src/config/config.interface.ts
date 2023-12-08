type IConfig = {
  apiBaseUrl: string;
  apiVersion: string;
};

type ConfigFactory = () => IConfig;

export type { IConfig, ConfigFactory };
