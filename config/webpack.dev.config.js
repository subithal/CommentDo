var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const port = 5000;

const outputPath = { publicPath: 'http://localhost:5000'};

var config = {
   mode: 'development',
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
   devtool: 'eval-source-map',
   devServer: {
      compress: true,
      historyApiFallback: true,
      hot: true,
      stats: { children: false },
      port,
      proxy:{
         "*": {
            "target": "http://localhost:8090/"
         }

      },
      noInfo: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      }
    },
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
       })
      ]
}
module.exports = config;
