import type { FC } from 'react';
import Link from 'next/link';

type FooterProps = {
  className?: string;
  authorName: string;
  authorUrl: string;
};

const Footer: FC<FooterProps> = ({ className, authorName, authorUrl }) => {
  const year = new Date().getFullYear();

  return (
    <footer className={className}>
      <div className={'container mx-auto px-2 py-1 flex justify-end gap-1'}>
        <span>&copy; {year}</span>
        <Link href={authorUrl}>{authorName}</Link>
      </div>
    </footer>
  );
};

export { Footer };
