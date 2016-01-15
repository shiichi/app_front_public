var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr',
    'bootstrap-sass!./src-admin/theme/bootstrap-sass.config.js',
    './src-admin/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3001/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("dev")
    }),
    new ExtractTextPlugin('bundle.css')
  ],
  module: {
    loaders: [
      { test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/
      }, {
        test: /bootstrap-social.css$/,
        loaders: ['style-loader','css-loader']
      }, {
        test: /\.min.css$/,
        loaders: ['style-loader','css-loader']
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
      }, {
        test: /\.jpg$/,
        loader: "url-loader?mimetype=image/jpg"
      }
    ]
  },

  postcss: function() {
    return [autoprefixer({ browsers: ['last 2 versions', 'safari 5', 'ie 9', 'ios 6', 'android 4'] })];
  }
};
