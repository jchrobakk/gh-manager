const path = require("path");
// importuję bibliotękę [path] z [node.js]
const HtmlWebpackPlugin = require("html-webpack-plugin");
// importuję odpowiedni plugin
module.exports = {
  entry: {
    entry: "./src/app.js",
  },
  // definiuje pliki wejściowe
  // posiadające swoje identyfikatory [chunks]
  output: {
    path: path.resolve(__dirname, "build"),
    // definiuje ścieżką wyjściową
    filename: "app.min.js",
    // definiuję nazwę pliku wyjściowego
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        // określam jakie pliki
        // będą brane pod uwagę
        exclude: /node_modules/,
        // określam wykluczenia
        use: "babel-loader",
        // określam jaki [loader]
        // ma być wykorzystany
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // wskazuje plik źródłowy
      filename: "index.html",
      // określan nazwę dla pliku
    }),
  ],
};
