import { ImageResponse } from 'next/og';
import { LogoIcon } from '@/assets/logo.icon';
import { icons } from '@/app/icons';

const generateImageMetadata = () =>
  icons.map(({ contentType, id, size }) => ({
    contentType,
    id,
    size: { width: size, height: size },
  }));

const IconResponse = ({ id }: { id: string }) => {
  const isMaskable = id.includes('-maskable');
  const size = isMaskable ? id.split('-').at(0) : id;
  const padding = isMaskable ? `${Number(size) / 5}px` : '0';

  return new ImageResponse(
    (
      <div
        style={{
          background: isMaskable ? 'white' : 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          padding,
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
