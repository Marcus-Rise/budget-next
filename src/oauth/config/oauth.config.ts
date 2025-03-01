import 'server-only';
import type { OauthConfigFactory } from '@/oauth/config/oauth-config.interface';

const oauthConfigFactory: OauthConfigFactory = () => ({
  codeVerifier: process.env.VK_ID_SECRET!,
  serviceToken: process.env.VK_ID_SERVICE_TOKEN!,
  appId: process.env.VK_ID_APP_ID!,
  redirectUrl: new URL('/api/account/login', process.env.VK_ID_REDIRECT_URL!),
  apiUrl: new URL('https://id.vk.com'),
});

export { oauthConfigFactory };
