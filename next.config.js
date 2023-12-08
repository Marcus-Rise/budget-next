/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.userapi.com',
      },
    ],
  },
};

module.exports = nextConfig;
