import type { Preview } from '@storybook/react';
import '../src/app/globals.css';
import { Roboto } from 'next/font/google';
import classNames from 'classnames';

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
      <div className={classNames(roboto.variable, 'font-sans bg-background text-font')}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
