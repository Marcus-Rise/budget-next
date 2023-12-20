'use client';

import type { ComponentProps, FC } from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IconProfile } from '@/assets';
import classNames from 'classnames';

type ProfileImageProps = Pick<
  ComponentProps<typeof Image>,
  'src' | 'className' | 'alt' | 'height' | 'width'
>;

const ProfileImage: FC<ProfileImageProps> = ({ alt, src, className, height, width }) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(() => false);
  }, [src]);

  if (error) {
    return (
      <IconProfile className={classNames(className, 'fill-font')} height={height} width={width} />
    );
  }

  return (
    <Image
      alt={alt}
      src={src}
      height={height}
      width={width}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export { ProfileImage };
