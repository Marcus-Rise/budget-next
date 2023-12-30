import { ImageResponse } from 'next/og';
import { LogoIcon } from '@/assets/logo.icon';

const SIZE = 150;
const size = {
  width: SIZE,
  height: SIZE,
};

const contentType = 'image/png';

const IconResponse = () => {
  const padding = `${Number(SIZE) / 5}px`;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          padding,
        }}
      >
        <LogoIcon
          size={`${SIZE}px`}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        />
      </div>
    ),
    {
      width: Number(SIZE),
      height: Number(SIZE),
    },
  );
};

export default IconResponse;
export { size, contentType };
