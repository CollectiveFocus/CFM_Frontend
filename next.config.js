module.exports = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      new URL('https://community-fridge-map-images-prod.s3.amazonaws.com/**'),
    ],
  },
  pageExtensions: ['page.jsx', 'page.js'],

  compiler: {
    emotion: true,
  },
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

  // ---

  eslint: {
    dirs: ['src/', 'ci/'],
  },
};
