import 'server-only';
import { OauthConfigFactory } from '@/oauth/config/oauth-config.interface';

const oauthConfigFactory: OauthConfigFactory = () => {
  const redirectOriginUrl = new URL(process.env.VK_ID_REDIRECT_URL!);

  return {
    appId: Number(process.env.VK_ID_APP_ID!),
    serviceToken: process.env.VK_ID_SERVICE_TOKEN!,
    redirectUrl: new URL('/api/account/login', redirectOriginUrl).href,
    apiBaseUrl: new URL(process.env.VK_API_URL!).href,
    apiVersion: process.env.VK_API_VERSION!,
    idApiUrl: new URL(process.env.VK_ID_API_URL!).href,
  };
};

export { oauthConfigFactory };
