import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { LogoImageResponse } from '@/app/logo-image-response.component';

const ManifestIcon = (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  const isMaskable = id.includes('-maskable');
  const size = isMaskable ? id.split('-').at(0) ?? id : id;

  return new ImageResponse(<LogoImageResponse isMaskable={isMaskable} size={size} />, {
    width: Number(size),
    height: Number(size),
  });
};

export { ManifestIcon as GET };
