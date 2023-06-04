const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // vanilla-extract still needs it
    appDir: true,
    serverActions: true,
  },
  reactStrictMode: true,
  output: "standalone",

  images: {
    minimumCacheTTL: 60, // 1 minute
  },
};

module.exports = withVanillaExtract(nextConfig);
