const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const webpack = require('webpack');

var env = process.env.NODE_ENV || 'development';
console.log('NODE_ENV: ', env);

var plugins = [
  new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body'
  })
];

if (env === 'production') {
  plugins.push(
    new OptimizeJsPlugin({
      sourceMap:false
    })
  )
}


module.exports = {
  entry: (env !== 'production' ? [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
] : []).concat(['./client/index.js']),
output: {
  filename: './bundle.js',
  path: path.resolve(__dirname, 'public'),
},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  plugins: plugins
};