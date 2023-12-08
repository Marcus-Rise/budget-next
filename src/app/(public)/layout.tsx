import type { FC, PropsWithChildren } from 'react';
import Link from 'next/link';

const PublicLayout: FC<PropsWithChildren> = ({ children }) => {
  const year = new Date().getFullYear();

  return (
    <div className={'h-[calc(100dvh)] w-full flex flex-col'}>
      <header className={'basis-1/2 flex flex-col justify-center'}>
        <h1 className={'font-bold text-center text-4xl'}>Мой бюджет</h1>
      </header>
      <main className={'basis-1/2'}>{children}</main>
      <footer className={'px-2 py-1 basis-auto flex justify-end gap-1'}>
        <span>&copy; {year}</span>
        <Link prefetch={false} href="https://ilya-konstantinov.ru">
          Ilya Konstantinov
        </Link>
      </footer>
    </div>
  );
};

export default PublicLayout;
