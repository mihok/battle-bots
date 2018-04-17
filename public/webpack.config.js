const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: ['@babel/polyfill', './build-babel/app.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
