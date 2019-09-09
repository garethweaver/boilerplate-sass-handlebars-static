const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const sharedLoaders = require('./webpack.shared.js')

const PATHS = {
  dist: path.join(__dirname, '/dist/'),
  src: path.join(__dirname, '/src/'),
}

module.exports = {
  mode: 'production',

  entry: [path.join(PATHS.src, 'app.js')],

  output: {
    path: PATHS.dist,
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      ...sharedLoaders,
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()],
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(PATHS.src, 'index.html.hbs'),
      templateParameters: require('./src/data/data.json'),
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
}
