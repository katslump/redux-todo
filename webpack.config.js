const webpack = require('webpack');


module.exports = {
  entry: './app/app.js',
  output: {
    path: __dirname + '/build',
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            plugins: ['transform-object-rest-spread']
          }
        }
      }
    ]
  },
  devServer: {
    proxy: {
      "/db": "http://localhost:3000"
    }
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
