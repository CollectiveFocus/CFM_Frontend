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
      {
        protocol: 'https',
        hostname: 'community-fridge-map-images-dev.s3.amazonaws.com',
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
  async redirects() {
    return [
      {
        source: '/user/fridge/report/:fridgeId',
        destination: '/fridge/:fridgeId/report',
        permanent: true, // HTTP 301 redirect for SEO preservation
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply stale-while-revalidate to all static page routes.
        // Excludes /fridge/* (managed by Next.js ISR revalidate: 3600) and
        // /_next/* (static assets already have immutable cache headers).
        source: '/((?!fridge|_next|api).*)',
        headers: [
          {
            key: 'Cache-Control',
            // max-age=0: always revalidate on next request
            // stale-while-revalidate=86400: serve stale for up to 24h while
            // revalidating in background. Content only changes on deploy, so
            // 24h staleness is fine — the CDN warmup script re-primes on every push.
            value: 'public, max-age=0, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
