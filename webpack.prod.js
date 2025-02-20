const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin"); // Minifies JS
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash].js", // Output JS files to 'js' folder with hash
    path: path.resolve(__dirname, "dist"),
    clean: true, // Cleans output folder before each build
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(), // Minify JS
      new CssMinimizerPlugin(), // Minify CSS
    ],
  },
});
