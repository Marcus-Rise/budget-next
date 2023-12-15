const colors = require('tailwindcss/colors');
const metaConfig = require('./src/meta-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--roboto)'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: colors.blue['500'],
          dark: colors.blue['600'],
        },
        success: {
          DEFAULT: 'var(--color-success)',
          light: colors.green['500'],
          dark: colors.green['600'],
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          light: colors.gray['500'],
          dark: colors.gray['400'],
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
          light: colors.red['500'],
          dark: colors.red['600'],
        },
        background: {
          DEFAULT: 'var(--color-background)',
          light: metaConfig.themeColor.light,
          dark: metaConfig.themeColor.dark,
        },
        font: {
          DEFAULT: 'var(--color-font)',
          light: colors.black,
          dark: colors.gray['200'],
        },
      },
    },
  },
  plugins: [],
};
