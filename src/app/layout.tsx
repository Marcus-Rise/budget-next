import type { Metadata, Viewport } from 'next';
import './globals.css';
import { FC, PropsWithChildren } from 'react';
import { Roboto } from 'next/font/google';
import { configFactory } from '@/config';
import classNames from 'classnames';
import metaConfig from '@/meta-config.cjs';
import Logo from './icon.png';

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
    metadataBase: baseUrl,

    applicationName: metaConfig.title,
    title: metaConfig.title,
    description: metaConfig.description,
    manifest: '/manifest.json',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: metaConfig.title,
    },
    openGraph: {
      images: new URL(Logo.src, baseUrl),
    },
  };
};

const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: metaConfig.themeColor.dark },
    { media: '(prefers-color-scheme: light)', color: metaConfig.themeColor.light },
  ],
};

export default RootLayout;
export { generateMetadata, viewport };
