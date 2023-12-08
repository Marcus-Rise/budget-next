import type { Metadata } from 'next';
import './globals.css';
import { FC, PropsWithChildren } from 'react';
import { Roboto } from 'next/font/google';
import classNames from 'classnames';
import { configFactory } from '@/config';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="ru">
    <body className={classNames(roboto.className, 'h-screen')}>{children}</body>
  </html>
);

const generateMetadata = (): Metadata => {
  const { baseUrl } = configFactory();

  return {
    title: 'Мой бюджет',
    description: 'Приложение для учета бюджета',
    metadataBase: baseUrl,
  };
};

export default RootLayout;
export { generateMetadata };
