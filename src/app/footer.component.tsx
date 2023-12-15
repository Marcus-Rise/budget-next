import type { FC } from 'react';
import Link from 'next/link';

type FooterProps = {
  className?: string;
};

const Footer: FC<FooterProps> = ({ className }) => {
  const year = new Date().getFullYear();

  return (
    <footer className={className}>
      <div className={'container mx-auto px-2 py-1 flex justify-end gap-1'}>
        <span>&copy; {year}</span>
        <Link prefetch={false} href="https://ilya-konstantinov.ru">
          Ilya Konstantinov
        </Link>
      </div>
    </footer>
  );
};

export { Footer };