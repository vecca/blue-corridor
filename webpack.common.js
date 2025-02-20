const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js", // Common entry file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Cleans output folder before each build
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS
          "css-loader", // Resolves CSS imports
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                /* plugins: [require("postcss-import"), require("postcss-simple-vars"), require("postcss-nested"), require("autoprefixer")], */
                config: path.resolve(__dirname, "postcss.config.js"),
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", // Hash for caching
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
