import { ImageResponse } from 'next/og';
import { LogoImageResponse } from '@/app/logo-image-response.component';

const generateImageMetadata = () =>
  [128, 192, 256, 384, 512].map((size) => ({
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

export default IconResponse;
export { generateImageMetadata };
