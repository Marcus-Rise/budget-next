import type { FC, PropsWithChildren } from 'react';
import Link from 'next/link';

const SecureLayout: FC<PropsWithChildren> = ({ children }) => {
  const year = new Date().getFullYear();

  return (
    <div className={'h-[calc(100dvh)] w-full flex flex-col'}>
      <header className={'basis-full'}>
        <h1 className={'font-bold'}>Мой бюджет</h1>
      </header>
      <main className={'basis-full'}>{children}</main>
      <footer className={'px-2 py-1 basis-auto flex justify-end gap-1'}>
        <span>&copy; {year}</span>
        <Link prefetch={false} href="https://ilya-konstantinov.ru">
          Ilya Konstantinov
        </Link>
      </footer>
    </div>
  );
};

export default SecureLayout;
