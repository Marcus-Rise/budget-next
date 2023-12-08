type IOauthConfig = {
  appId: number;
  serviceToken: string;
  redirectUrl: string;
  apiBaseUrl: string;
  apiVersion: string;
};

type OauthConfigFactory = () => IOauthConfig;

export type { IOauthConfig, OauthConfigFactory };
