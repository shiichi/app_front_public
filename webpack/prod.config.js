var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'bootstrap-sass!./src/theme/bootstrap-sass.config.js',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('bundle.css')
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: [ 'babel' ], exclude: /node_modules/,include: __dirname },
      //{ test: /\.css?$/, loaders: [ 'style', 'raw' ], include: __dirname },

      /* bootstrap-webpack has access to the jQuery object */
      //{ test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      //{ test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },

      { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' },
      { test: /glyphicons-halflings-regular\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /glyphicons-halflings-regular\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /glyphicons-halflings-regular\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /glyphicons-halflings-regular\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /glyphicons-halflings-regular\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" },

      /* font-awesome */
      {
        test: /font-awesome.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /fontawesome-webfont\.(otf|eot|svg|ttf|woff)\??/,
        loader: 'url-loader?limit=8192'
      }
    ]
  }
}
