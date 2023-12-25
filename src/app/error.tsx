'use client'; // Error components must be Client Components

import { Button } from '@/components/button.component';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={'h-screen w-full flex flex-col items-center justify-center gap-3'}>
      <h1 className={'font-medium text-2xl'}>Что-то пошло не так!</h1>
      <Link href={'/api/account/logout'}>
        <Button>Попробовать войти снова</Button>
      </Link>
    </div>
  );
}
