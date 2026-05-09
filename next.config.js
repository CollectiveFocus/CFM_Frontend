/** @type {import('next').NextConfig} */

const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_USERS_API_URL',
  'NEXT_PUBLIC_NOTIFICATIONS_API_URL',
];

// Skip env checks during test runs — tests set env vars themselves via isolateModules.
if (process.env.NODE_ENV !== 'test') {
  for (const key of REQUIRED_ENV_VARS) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}

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
  compiler: {
    emotion: true,
  },
  async rewrites() {
    // Determine the API URL from the environment or default to local json-server
    const apiUrl =
      process.env.NEXT_PUBLIC_FF_API_URL || 'http://127.0.0.1:3050';
    return [
      {
        source: '/v1/:path*',
        destination: `${apiUrl}/v1/:path*`, // Proxy to Backend API or local mock server
      },
    ];
  },
};

export default nextConfig;
