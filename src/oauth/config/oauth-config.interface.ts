type IOauthConfig = {
  apiUrl: URL;
  redirectUrl: URL;
  serviceToken: string;
  codeVerifier: string;
  appId: string;
};

type OauthConfigFactory = () => IOauthConfig;

export type { IOauthConfig, OauthConfigFactory };
