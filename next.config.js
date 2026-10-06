/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  experimental: {
    turbopack: false,
  },
  webpack: (config, { isServer }) => {
    if (config.output) {
      config.output.hashFunction = 'xxhash64';
    }
    return config;
  },
};

module.exports = nextConfig;
