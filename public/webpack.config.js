module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './scripts/app.ts',
    output: {
      path: __dirname,
      filename: 'build/app.js'
    },
    resolve: {
      extensions: ['.ts', '.ts', '.js']
    },
    module: {
      rules: [
        { test: /\.ts?$/, loader: 'ts-loader' }
      ]
    }
  }