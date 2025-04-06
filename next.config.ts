import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  // Tell Next.js to trust the proxy headers
  experimental: {
    trustHostHeader: true,
  },
  // Prevent Next.js from trying to handle HTTP/HTTPS redirects
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            // Make Next.js aware it's behind a proxy that handles HTTPS
            key: 'X-Forwarded-Proto',
            value: 'https',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/service/:path*',
        destination: 'https://metatool-service.jczstudio.workers.dev/:path*',
      },
    ];
  },
};

export default nextConfig;
