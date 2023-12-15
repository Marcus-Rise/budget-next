const colors = require('tailwindcss/colors');
const packageConfig = require('../package.json');

const metaConfig = {
  title: 'Мой бюджет',
  description: 'Приложение для учета бюджета',
  themeColor: {
    light: colors.white,
    dark: colors.gray['800'],
  },
  author: {
    name: packageConfig.author.name,
    url: packageConfig.author.url,
  }
};

module.exports = metaConfig;
