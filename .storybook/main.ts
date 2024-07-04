import type { StorybookConfig } from '@storybook/nextjs';
import * as path from 'path';

const config: StorybookConfig = {
  framework: '@storybook/nextjs',

  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],

  docs: {},

  staticDirs: ['../public'],

  // https://storybook.js.org/blog/build-a-nextjs-app-with-rsc-msw-storybook/
  features: { experimentalRSC: true },

  webpackFinal: async (config: any) => {
    // Add path aliases
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');

    return config;
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
