"use strict";

const path = require("path");
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== 'production';

// Customized babel loader with the minimum we need to get `mdx` libraries
// working, which unfortunately codegen JSX instead of JS.
const babelLoader = {
  loader: require.resolve("babel-loader"),
  options: {
    // Use user-provided .babelrc
    babelrc: true,
    // ... with some additional needed options.
    presets: [require.resolve("@babel/preset-react")],
    plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
  },
};

module.exports = (env) => {
  let entry = "./src/index.js";
  let bundleOutputFilename = "deck.js";
  let htmlOutputFilename = "index.html";
  return {
    mode: isDevelopment ? 'development' : 'production',
    entry, // Default for boilerplate generation.
    output: {
      path: path.resolve("dist"),
      filename: bundleOutputFilename,
    },
    devServer: {
      hot: true,  
      client: { overlay: false },
    },
    devtool: "source-map",
    module: {
      // Not we use `require.resolve` to make sure to use the loader installed
      // within _this_ project's `node_modules` traversal tree.
      rules: [
        {
          test: /\.jsx?$/,
          use: [babelLoader],
        },
        // `.md` files are processed as pure text.
        {
          test: /\.md$/,
          use: [require.resolve("raw-loader")],
        },
        // `.mdx` files go through babel and our mdx transforming loader.
        {
          test: /\.mdx$/,
          use: [babelLoader, require.resolve("spectacle-mdx-loader")],
        },
        {
          test: /\.(png|svg|jpg|gif|webp)$/,
          use: [require.resolve("file-loader")],
        },
      ],
    },
    // Default for boilerplate generation.
    plugins: [
      isDevelopment && new ReactRefreshPlugin(),
      new HtmlWebpackPlugin({
        title: "Machine-Learned Prediction Equilibrium for Dynamic Traffic Assignment",
        template: "./src/index.html",
        filename: htmlOutputFilename,
      }),
    ].filter(Boolean),
    resolve: {
      fallback: { util: false, assert: false },
    },
  };
};
