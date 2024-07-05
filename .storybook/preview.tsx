import type { Preview } from '@storybook/react';
import '../src/app/globals.css';
import { Roboto } from 'next/font/google';
import clsx from 'clsx';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--roboto',
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className={clsx(roboto.variable, 'font-sans bg-background text-font h-screen p-3')}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
