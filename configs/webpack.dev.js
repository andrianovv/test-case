const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackCommon = require('./webpack.common');
const merge = require('webpack-merge');

const distPath = path.join(__dirname, '..', './dist');
const sourcePath = webpackCommon.sourcePath;

// todo read from command line
const port = 3001;

module.exports = merge.smart(webpackCommon.config, {
  mode: 'development',
  entry: [
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server',
    path.join(sourcePath, 'index.tsx')
  ],
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: distPath,
    port: port,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          ...webpackCommon.scssLoaders
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              localIdentName: '[local]__[hash:base64:5]'
            }
          }
        ]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: [{
          ...webpackCommon.fileLoader,
          options: {
            ...webpackCommon.fileLoader.options,
          }
        }]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
