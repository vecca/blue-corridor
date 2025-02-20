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
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Add rule for image files
        type: "asset/resource", // Use asset/resource to handle images
        generator: {
          filename: "images/[name][hash][ext]", // Output images to 'images' folder with hash
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              sources: {
                list: [
                  {
                    tag: "img",
                    attribute: "src",
                    type: "src",
                  },
                  {
                    tag: "source",
                    attribute: "srcset",
                    type: "srcset",
                  },
                ],
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
