import 'server-only';
import type { ConfigFactory } from '@/config/config.interface';

const configFactory: ConfigFactory = () => ({
  canonicalBaseUrl: new URL(process.env.CANONICAL_BASE_URL!),
  apiBaseUrl: new URL(process.env.VK_API_URL!).href,
  apiVersion: process.env.VK_API_VERSION!,
});

export { configFactory };
