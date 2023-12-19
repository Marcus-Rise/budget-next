import type { Metadata, Viewport } from 'next';
import './globals.css';
import { FC, PropsWithChildren } from 'react';
import { Roboto } from 'next/font/google';
import { configFactory } from '@/config';
import classNames from 'classnames';
import metaConfig from '@/meta-config.cjs';
import Logo from './icon.png';
import { Analytics } from '@vercel/analytics/react';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--roboto',
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="ru">
    <body className={classNames(roboto.variable, 'font-sans bg-background text-font')}>
      {children}
      <Analytics />
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
      title: metaConfig.title,
      description: metaConfig.description,
      type: 'website',
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
