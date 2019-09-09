module.exports = [
  {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    },
  },
  {
    test: /\.hbs$/,
    loader: 'handlebars-loader',
    options: {
      helperDirs: [__dirname + '/src/handlebars'],
    },
  },
]
