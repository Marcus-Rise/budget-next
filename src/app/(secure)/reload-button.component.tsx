'use client';
import type { FC } from 'react';
import { IconReload } from '@/assets';
import { Button } from '@/components/button.component';
import { useRouter } from 'next/navigation';

type ReloadButtonProps = { className?: string };

const ReloadButton: FC<ReloadButtonProps> = ({ className }) => {
  const router = useRouter();
  const reload = () => router.refresh();

  return (
    <Button rounded className={className} onClick={reload}>
      <IconReload />
    </Button>
  );
};

export { ReloadButton };
