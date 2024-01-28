import { ImageResponse } from 'next/og';
import { LogoImageResponse } from '@/components/logo-image-response.component';
import metaConfig from '@/meta-config.cjs';

const SIZE = 512;

const IconResponse = () => {
  return new ImageResponse(<LogoImageResponse size={SIZE} isMaskable />, {
    width: Number(SIZE),
    height: Number(SIZE),
  });
};

export const runtime = 'nodejs';
export const contentType = 'image/png';
export const alt = metaConfig.title;
export const size = {
  width: SIZE,
  height: SIZE,
};

export default IconResponse;
