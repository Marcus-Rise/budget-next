import type { FC } from 'react';
import { LogoIcon } from '@/assets';

type LogoImageResponseProps = { isMaskable?: boolean; size: number | `${number}` | string };

const LogoImageResponse: FC<LogoImageResponseProps> = ({ isMaskable, size }) => {
  const padding = isMaskable ? `${Number(size) / 5}px` : '0';

  return (
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
  );
};

export { LogoImageResponse };
