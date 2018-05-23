'use strict';

var path = require('path');
var webpack = require('webpack');
var del = require('del');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackStrip = require('strip-loader');
var Dotenv = require('dotenv-webpack');


class CleanPlugin {
  constructor(options) {
    this.options = options;
  }

  apply () {
    del.sync(this.options.files);
  }
}

module.exports = {
  entry: './app/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.min.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanPlugin({
      files: ['dist/*']
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new Dotenv({
      path: './.env', // if not simply .env 
      // safe: true // lets load the .env.example file as well 
    }),
    new ExtractTextPlugin({
      filename: '[name].min.css'
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      options: {
        sassLoader: {
          outputStyle: 'compressed'
        }
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'app'),
        query: {
          plugins: [
            ['transform-object-assign']
          ]
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        include: [path.join(__dirname, 'app/styles'), path.join(__dirname, 'node_modules')],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                options : { autoprefixer: false, sourceMap: true, importLoaders: 1 },
                plugins: function () {
                  return [
                    require('precss'),  
                    require('autoprefixer')
                  ];
                }
              }
            },
            'sass-loader',
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: path.join(__dirname, 'app/assets'),
        loader: 'url-loader?limit=8192&name=images/[name].[ext]?[hash]'
      }
    ]
  }
};
