var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const port = 5000;

const serverPort = 8090;

const outputPath = { publicPath: 'dist' };

var config = {
   mode: 'production',
   entry: [
      '@babel/polyfill',
      path.resolve(__dirname, '../src/main.jsx')
     ],
   output: { path: path.resolve(__dirname, '../dist/'), ...outputPath },
   resolve: {
      extensions: [
        '.js',
        '.jsx',
      ],
   },
   optimization: {
        minimizer: [
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
                compress: false,
                ecma: 6,
                mangle: true
            },
            sourceMap: true
            })
        ],
    },
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
         {
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,   
            loader: 'babel-loader',
            options: {
               plugins: [
                  'transform-class-properties'
               ],
            },
         },
         {
            test: /\.(png|jpg)$/,
            use: [
               {
               loader: 'url-loader',
               options: {
                  limit: 8192,
               },
               },
            ],
         },
         {
            test: /\.(css)$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    hmr: process.env.NODE_ENV === 'development',
                  },
               },
               'css-loader',
               {
                  loader: 'postcss-loader',
                  options: {
                     config: {
                        path: path.resolve(__dirname)
                     }
                  } 
               }
            ]
         }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         filename: 'index.html',
         title: 'CommentDo',
         template: path.join(__dirname, '../assets/template.html'),
       }),
       new MiniCssExtractPlugin({
         filename: 'static/[name].[hash].css',
       }),
       new webpack.optimize.AggressiveMergingPlugin(),
      ]
}
module.exports = config;
