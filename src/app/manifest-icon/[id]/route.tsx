import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { LogoImageResponse } from '@/components/logo-image-response.component';
import { ICON_SIZES } from '@/app/icon-sizes.constant';

const ManifestIcon = (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  const isMaskable = id.includes('-maskable');
  const size = isMaskable ? id.split('-').at(0) ?? id : id;

  return new ImageResponse(<LogoImageResponse isMaskable={isMaskable} size={size} />, {
    width: Number(size),
    height: Number(size),
  });
};

export const generateStaticParams = () => {
  return ICON_SIZES.flatMap((size) => [
    {
      id: `${size}`,
    },
    { id: `${size}-maskable` },
  ]);
};

export const runtime = 'nodejs';

export { ManifestIcon as GET };
