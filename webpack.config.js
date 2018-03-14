const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const webpackConfig = {
  entry: {
    app:
      './app.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./', 'index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      sourceRoot: '/',
      noSources: true,
      moduleFilenameTemplate: '[absolute-resource-path]',
      fallbackModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  ],
  devServer: {
    inline: true,
    compress: true,
    port: 3000,
    host: '192.168.109.247',
    disableHostCheck: true
  }
};

module.exports = webpackConfig;