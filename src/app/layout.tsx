import type { Metadata } from 'next';
import './globals.css';
import { FC, PropsWithChildren } from 'react';
import { Roboto } from 'next/font/google';
import classNames from 'classnames';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['cyrillic', 'latin'],
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="ru">
    <body className={classNames(roboto.className, 'h-screen')}>{children}</body>
  </html>
);

const metadata: Metadata = {
  title: 'Мой бюджет',
  description: 'Приложение для учета бюджета',
};

export default RootLayout;
export { metadata };
