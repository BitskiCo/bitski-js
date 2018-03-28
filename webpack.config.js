const webpack = require('webpack');
const path = require('path');

const libraryName = 'bitski';
const outputFile = libraryName + '.js';

const config = {
  devtool: 'source-map',
  entry: __dirname + '/src/bitski.ts',
  module: {
    rules: [{
        test: /\.ts$/,
        enforce: 'pre',
        use: {
          loader: 'tslint-loader'
        }
    }, {
      test: /\.ts$/,
      use: {
        loader: 'ts-loader'
      }
    }, {
      test: /\.svg$/,
      use: {
        loader: 'raw-loader'
      }
    }]
  },
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};

module.exports = config;
