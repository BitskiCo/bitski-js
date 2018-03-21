const webpack = require('webpack');
const path = require('path');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/*
 * We've enabled ExtractTextPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 *
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
