import { ImageResponse } from 'next/og';
import { LogoImageResponse } from '@/app/logo-image-response.component';

const generateImageMetadata = () =>
  [48, 72].map((size) => ({
    contentType: 'image/png',
    id: String(size),
    size: { width: size, height: size },
  }));

const IconResponse = ({ id }: { id: string }) => {
  const size = id;

  return new ImageResponse(<LogoImageResponse size={id} isMaskable={false} />, {
    width: Number(size),
    height: Number(size),
  });
};

export default IconResponse;
export { generateImageMetadata };
