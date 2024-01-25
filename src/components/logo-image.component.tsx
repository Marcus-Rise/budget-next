import type { FC } from 'react';
import Image from 'next/image';
import type { ICON_SIZES } from '@/app/icon-sizes.constant';

type IconSize = (typeof ICON_SIZES)[number];

type LogoImageProps = { className?: string; size: `${IconSize}` | IconSize };

const LogoImage: FC<LogoImageProps> = ({ size, className }) => (
  <Image
    src={`/manifest-icon/${size}`}
    width={size}
    height={size}
    alt={'logo'}
    className={className}
  />
);

export { LogoImage };
