import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  webpack(config, { isServer }) {
    if (!isServer) {
      config.optimization.minimize = true;
    }
    return config;
  },

  compiler: {
    emotion: true,
  },
};

export default nextConfig;
