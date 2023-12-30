import type { MetadataRoute } from 'next';
import metaConfig from '@/meta-config.cjs';
import { icons as iconsSizes } from './icons';

const icons = iconsSizes.map(({ size, contentType, id, maskable }) => ({
  src: '/icon/' + id,
  type: contentType,
  sizes: `${size}x${size}`,
  purpose: maskable ? ('maskable' as const) : ('any' as const),
}));

const generateManifest = (): MetadataRoute.Manifest => ({
  name: metaConfig.title,
  short_name: metaConfig.title,
  description: metaConfig.description,
  theme_color: metaConfig.themeColor.light,
  background_color: metaConfig.themeColor.light,
  display: 'standalone',
  orientation: 'portrait',
  start_url: '/',
  id: '/',
  icons,
});

export default generateManifest;
