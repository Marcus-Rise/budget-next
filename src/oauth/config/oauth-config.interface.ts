type IOauthConfig = {
  idApiUrl: string;
  appId: number;
  serviceToken: string;
  redirectUrl: string;
};

type OauthConfigFactory = () => IOauthConfig;

export type { IOauthConfig, OauthConfigFactory };
