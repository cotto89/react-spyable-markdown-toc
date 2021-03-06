const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const PATHS = {
  src: path.join(__dirname, '../', 'example'),
  dist: path.join(__dirname, '../', 'example/dist'),
  publicPath: '/example/dist/',
};

module.exports = {
  entry: {
    index: `${PATHS.src}/index.js`,
  },
  output: {
    path: PATHS.dist,
    publicPath: PATHS.publicPath,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
      },
      {
        test: /\.md$/,
        loader: 'raw',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
  plugins: [
    new WebpackNotifierPlugin({ title: 'example' }),
    new ExtractTextPlugin('bundle.css'),
  ],
};
