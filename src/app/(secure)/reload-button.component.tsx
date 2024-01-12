'use client';
import type { FC } from 'react';
import { IconReload } from '@/assets';
import { Button } from '@/components/button.component';
import { useRouter } from 'next/navigation';
import { useCallback, useTransition } from 'react';

type ReloadButtonProps = { className?: string };

const ReloadButton: FC<ReloadButtonProps> = ({ className }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const reload = useCallback(() => startTransition(() => router.refresh()), [router]);

  return (
    <Button rounded className={className} onClick={reload} disabled={isPending}>
      <IconReload />
    </Button>
  );
};

export { ReloadButton };
