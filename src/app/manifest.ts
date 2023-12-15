import type { MetadataRoute } from 'next';
import icon from './icon.png';
import colors from 'tailwindcss/colors';

const manifest = (): MetadataRoute.Manifest => ({
  name: 'Мой бюджет',
  short_name: 'Мой бюджет',
  description: 'Приложение для учета бюджета',
  theme_color: colors.gray['800'],
  background_color: colors.gray['800'],
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
