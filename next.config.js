/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "bayut-production.s3.eu-central-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.bayut.com",
      },
    ],
  },
};

module.exports = nextConfig;
