module.exports = {
  entry: ["babel-polyfill", "./web/static/js/app.js"],
  output: {
    path: "./priv/static/",
    filename: "js/app.js"
  },
  devtool: "inline-source-map",
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        presets: ["es2015", "react", "stage-2"]
      }
    }]
  },
  resolve: {
    extensions: ["", ".js", ".jsx", ".es6"]
  }
}
