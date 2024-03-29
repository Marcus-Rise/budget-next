import { ImageResponse } from 'next/og';
import { LogoImageResponse } from '@/components/logo-image-response.component';
import { ICON_SIZES } from '@/app/icon-sizes.constant';

const generateImageMetadata = () =>
  ICON_SIZES.map((size) => ({
    contentType: 'image/png',
    id: String(size),
    size: { width: size, height: size },
  }));

const IconResponse = ({ id }: { id: string }) => {
  const size = id;

  return new ImageResponse(<LogoImageResponse size={id} isMaskable />, {
    width: Number(size),
    height: Number(size),
  });
};

export const runtime = 'edge';

export default IconResponse;
export { generateImageMetadata };
