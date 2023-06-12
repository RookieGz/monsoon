/** @type {import('webpack').Configuration} */
// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: path.resolve(__dirname, "./server/index.ts"),
  output: {
    path: path.resolve(__dirname, "./.server"),
  },
  target: "node",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    alias: {
      server: path.resolve(__dirname, "./server"),
    },
    // mainFields: ["main", "module", "browser"],// 变更webpack的文件查找顺序
  },
  externalsType: "commonjs",
  externals: ["next", "formidable"],
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
