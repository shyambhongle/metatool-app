import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  // Prevent Next.js from trying to handle HTTP/HTTPS redirects
  poweredByHeader: false,
  // Use more standard configuration options
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            // Help Next.js understand it's behind a proxy
            key: 'X-Forwarded-Host',
            value: '*',
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
