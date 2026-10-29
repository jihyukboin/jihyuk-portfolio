import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactCompiler: true,
  experimental: {
    turbopackRustReactCompiler: true
  },
  images: {
    qualities: [75, 90]
  }
};

export default nextConfig;
