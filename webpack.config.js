const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const data = require('./src/data/data.json')
const autoprefixer = require('autoprefixer')
const sharedLoaders = require('./webpack.shared.js')

const PATHS = {
  src: path.join(__dirname, '/src/'),
}

module.exports = {
  devServer: {
    contentBase: PATHS.src,
    watchContentBase: true,
    hot: true,
    inline: true,
  },

  mode: 'development',

  entry: [path.join(PATHS.src, 'app.js')],

  output: {
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [
          'style-loader',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()],
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(PATHS.src, 'index.html.hbs'),
      templateParameters: require('./src/data/data.json'),
    }),
  ],
}
