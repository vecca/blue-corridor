const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map", // Enables better debugging
  devServer: {
    static: "./src", //Optional if using HtmlWebpackPlugin
    hot: true, // Enables hot module replacement
    port: 3000, // Runs on localhost:3000
    open: {
      app: {
        name: "firefox",
      },
    },
  },
});
