import type { Metadata, Viewport } from 'next';
import './globals.css';
import { FC, PropsWithChildren } from 'react';
import { Roboto } from 'next/font/google';
import { configFactory } from '@/config';
import classNames from 'classnames';
import colors from 'tailwindcss/colors';

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

  const title = 'Мой бюджет';
  const description = 'Приложение для учета бюджета';

  return {
    metadataBase: baseUrl,

    applicationName: title,
    title,
    description,
    manifest: '/manifest.json',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title,
    },
  };
};

const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: colors.gray['800'] },
    { media: '(prefers-color-scheme: light)', color: colors.white },
  ],
};

export default RootLayout;
export { generateMetadata, viewport };
