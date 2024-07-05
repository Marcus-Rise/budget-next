'use client'; // Error components must be Client Components

import { Button } from '@/components/button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={'h-screen w-full flex flex-col items-center justify-center gap-3'}>
      <h1 className={'font-medium text-2xl'}>Что-то пошло не так!</h1>
      <div className={'flex flex-col items-center justify-between gap-3'}>
        <Button onClick={reset}>Обновить страницу</Button>
        <Link className={'w-full'} href={'/api/account/logout'} prefetch={false}>
          <Button className={'w-full'} variant={'secondary'}>
            Войти заново
          </Button>
        </Link>
      </div>
    </div>
  );
}
