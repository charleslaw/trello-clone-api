const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
    }),
  ],
};
