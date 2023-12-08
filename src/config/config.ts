import { ConfigFactory } from '@/config/config.interface';

const configFactory: ConfigFactory = () => {
  return {
    baseUrl: new URL(process.env.BASE_URL!),
    apiBaseUrl: new URL(process.env.VK_API_URL!).href,
    apiVersion: process.env.VK_API_VERSION!,
  };
};

export { configFactory };
