const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/, // Match CSS files
        use: [
          'style-loader', // Injects CSS into the DOM
          'css-loader',   // Translates CSS into CommonJS
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        type: 'asset/resource',
      },
    ],
  },
};