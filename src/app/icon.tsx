import { ImageResponse } from 'next/og';
import { LogoIcon } from '@/assets/logo.icon';

const generateImageMetadata = () =>
  [48, 72].map((size) => ({
    contentType: 'image/png',
    id: String(size),
    size: { width: size, height: size },
  }));

const IconResponse = ({ id }: { id: string }) => {
  const size = id;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: '0',
        }}
      >
        <LogoIcon
          size={`${size}px`}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        />
      </div>
    ),
    {
      width: Number(size),
      height: Number(size),
    },
  );
};

export default IconResponse;
export { generateImageMetadata };
