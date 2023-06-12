/** @type {import('next').NextConfig} */
const { DefinePlugin } = require("webpack");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ENV: process.env.ENV,
  },
  distDir: "../.next",
  compiler: {
    // Enables the styled-components SWC transform
    // 支持styled-components服务端渲染
    styledComponents: true,
  },
  webpack(config) {
    config.plugins.push(
      new DefinePlugin({ IS_PRODUCTION: process.env.NODE_ENV == "production" })
    );
    return config
  },
};

module.exports = nextConfig;
