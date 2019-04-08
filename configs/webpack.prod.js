const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');

const webpackCommon = require('./webpack.common');

const distPath = path.join(__dirname, '..', './dist');
const sourcePath = path.join(__dirname, '..', './src');

const basePath = '/';

module.exports = merge.smart(webpackCommon.config, {
  mode: 'production',
  entry: path.join(sourcePath, 'index.tsx'),
  devtool: 'source-map',
  output: {
    path: distPath,
    publicPath: basePath,
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          ...webpackCommon.scssLoaders
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
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
            publicPath: `${basePath}/images/`
          }
        }]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    })
  ],
});
