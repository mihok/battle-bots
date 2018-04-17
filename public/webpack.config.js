const path = require('path');
// const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const entries = {
  'library': [
    '@babel/polyfill',

    'stats.js',
    'three'
  ], 
  'bundle': [
    path.join(__dirname, '/src/app.ts')
  ]
};

const plugins = [
  /*
  new TSConfigPathsPlugin()
  new webpack.optimize.CommonsChunkPlugin({ 
    name: ['library', 'manifest']
  }),
  */
];

module.exports = {
  devtool: "source-map",
  context: __dirname,
  entry: entries, // ['@babel/polyfill', './build-babel/app.js'],
  // plugins: plugins,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [ path.join(__dirname, '/src/') ],
        exclude: [ 
          path.join(__dirname, '/node_modules/'),
          // path.join(__dirname, '/dist/')
        ],
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ 
                [
                  '@babel/preset-env', {
                    targets: {
                      'browsers': ['last 2 versions', 'safari >= 7']
                    },
                    'useBuiltIns': 'entry',
                  }
                ]
              ],
              plugins: [
                'transform-regenerator'
              ]
            },
          },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  }
};
