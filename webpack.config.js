'use strict';

var path = require('path');
var webpack = require('webpack');
var DashboardPlugin = require('webpack-dashboard/plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var Dotenv = require('dotenv-webpack');


module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './app/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new DashboardPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
          BROWSER: JSON.stringify(true),
          NODE_ENV: JSON.stringify( process.env.NODE_ENV || 'development' )
      }
    }),
    new Dotenv({
      path: './.env', // if not simply .env 
      // safe: true // lets load the .env.example file as well 
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new BrowserSyncPlugin(
      {
        proxy: 'http://localhost:3000/'
      },
      {
        reload: false
      }
    )
  ],
  module: {
    loaders: [
      {
        test: /\.xls.?$/,
        loader: 'excel-loader'
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'app'),
        query: {
          plugins: [
            ['react-transform', {
              'transforms': [{
                transform: 'react-transform-hmr',
                // If you use React Native, pass 'react-native' instead:
                imports: ['react'],
                // This is important for Webpack HMR:
                locals: ['module']
              }]
            }],
            ['transform-object-assign']
          ]
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        include: [path.join(__dirname, 'app/styles'), path.join(__dirname, 'node_modules')],
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: path.join(__dirname, 'app/assets'),
        loader: 'url-loader?limit=8192'
     }
    ]
  }
};
