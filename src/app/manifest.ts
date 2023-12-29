import type { MetadataRoute } from 'next';
import metaConfig from '@/meta-config.cjs';
import icon from '@/app/icon.png';
import icon512 from '@/assets/maskable_icon_x512.png';
import icon384 from '@/assets/maskable_icon_x384.png';
import icon192 from '@/assets/maskable_icon_x192.png';
import icon128 from '@/assets/maskable_icon_x128.png';
import icon96 from '@/assets/maskable_icon_x96.png';
import icon72 from '@/assets/maskable_icon_x72.png';
import icon48 from '@/assets/maskable_icon_x48.png';
import { StaticImageData } from 'next/dist/shared/lib/get-img-props';

const getManifestIcon = (image: StaticImageData) => ({
  src: image.src,
  type: 'image/png',
  sizes: `${image.width}x${image.height}`,
  purpose: 'maskable' as const,
});

const icons = [icon512, icon384, icon192, icon128, icon96, icon72, icon48].map((icon) =>
  getManifestIcon(icon),
);

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
  icons: [
    ...icons,
    {
      src: icon.src,
      type: 'image/png',
      sizes: `${icon.width}x${icon.height}`,
      purpose: 'any',
    },
  ],
});

export default generateManifest;
