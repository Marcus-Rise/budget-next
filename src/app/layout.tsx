import type { Metadata } from 'next';
import './globals.css';
import { FC, PropsWithChildren } from 'react';
import { Roboto } from 'next/font/google';
import { configFactory } from '@/config';
import classNames from 'classnames';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--roboto',
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="ru">
    <body className={classNames(roboto.variable, 'h-screen font-sans bg-background text-font')}>
      {children}
    </body>
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
