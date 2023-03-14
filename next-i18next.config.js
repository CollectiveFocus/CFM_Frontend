const { resolve } = require('path');

module.exports = {
  i18n: {
    locales: ['en-US', 'fr-FRA'],
    defaultLocale: 'en-US',
  },
  localePath: resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
