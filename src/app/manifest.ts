import type { MetadataRoute } from 'next';
import icon from './icon.png';
import metaConfig from '@/meta-config.cjs';

const manifest = (): MetadataRoute.Manifest => ({
  name: metaConfig.title,
  short_name: metaConfig.title,
  description: metaConfig.description,
  theme_color: metaConfig.themeColor.dark,
  background_color: metaConfig.themeColor.dark,
  display: 'standalone',
  orientation: 'portrait',
  start_url: '/',
  id: '/',
  icons: [
    { src: icon.src, purpose: 'maskable', sizes: `${icon.height}x${icon.width}` },
    {
      src: icon.src,
      purpose: 'any',
      sizes: `${icon.height}x${icon.width}`,
    },
  ],
});

export default manifest;
