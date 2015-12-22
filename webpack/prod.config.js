var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'bootstrap-sass!./src/theme/bootstrap-sass.config.js',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("prod")
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    //new webpack.optimize.MinChunkSizePlugin({minChunkSize: 1000}),
    //new webpack.optimize.LimitChunkCountPlugin({maxChunks: 10}),
    //new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin('bundle.css')
  ],
  module: {
    loaders: [
      { test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        loader: 'css?localIdentName=[path]!postcss-loader!sass'
      }, {
        test: /glyphicons-halflings-regular\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /glyphicons-halflings-regular\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /glyphicons-halflings-regular\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /glyphicons-halflings-regular\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, {
        test: /glyphicons-halflings-regular\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
      /* font-awesome */
      {
        test: /font-awesome.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }, {
        test: /fontawesome-webfont\.(otf|eot|svg|ttf|woff)\??/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },

  postcss: function() {
    return [autoprefixer({ browsers: ['last 2 versions', 'safari 5', 'ie 9', 'ios 6', 'android 4'] })];
  }
};
