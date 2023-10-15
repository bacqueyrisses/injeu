/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "em-content.zobj.net",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
