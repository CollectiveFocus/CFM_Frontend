/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'community-fridge-map-images-prod.s3.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  // App Router is enabled by default in Next.js 15+
  // We keep the emotion compiler for MUI
  compiler: {
    emotion: true,
  },
};

export default nextConfig;
