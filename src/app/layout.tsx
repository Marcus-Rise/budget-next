import type { Metadata, Viewport } from 'next';
import './globals.css';
import type { FC, PropsWithChildren } from 'react';
import { Roboto } from 'next/font/google';
import { clsx } from 'clsx';
import metaConfig from '@/meta-config.cjs';
import { configFactory } from '@/config';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--roboto',
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="ru">
    <body className={clsx(roboto.variable, 'font-sans bg-background text-font')}>{children}</body>
  </html>
);

const metadata: Metadata = {
  applicationName: metaConfig.title,
  title: metaConfig.title,
  description: metaConfig.description,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: metaConfig.title,
    startupImage: '/manifest-icon/512',
  },
  metadataBase: configFactory().canonicalBaseUrl,
  twitter: {
    card: 'summary',
  },
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
export { metadata, viewport };
