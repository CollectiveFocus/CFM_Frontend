module.exports = {
  reactStrictMode: true,

  // --- Next.js@12.2.2
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
  // ---

  eslint: {
    dirs: ['src/', 'ci/'],
  },
};
