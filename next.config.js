const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['127.0.0.1', 'placekitten.com'],
  },
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  experimental: {
    modularizeImports: {
      '@mui/material': {
        transform: '@mui/material/{{member}}',
      },
      '@mui/icons-material': {
        transform: '@mui/icons-material/{{member}}',
      },
      'components/atoms': {
        transform: 'components/atoms/{{member}}',
      },
      'components/molecules': {
        transform: 'components/molecules/{{member}}',
      },
      'components/organisms': {
        transform: 'components/organisms/{{member}}',
      },
    },
  },
  eslint: {
    dirs: ['src/', 'ci/'],
  },
  i18n,
};
