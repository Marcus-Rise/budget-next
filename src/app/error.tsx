'use client'; // Error components must be Client Components

import { JWT_ERROR_MESSAGE } from '@/auth/jwt/jwt.constants';
import { redirect } from 'next/navigation';
import { Button } from '@/components/button.component';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (error.message === JWT_ERROR_MESSAGE) {
    return redirect('/api/account/logout');
  }

  return (
    <div className={'h-screen w-full flex flex-col items-center justify-center gap-3'}>
      <h1 className={'font-medium text-2xl'}>Что-то пошло не так!</h1>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Попробовать еще раз
      </Button>
    </div>
  );
}
