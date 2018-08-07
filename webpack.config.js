const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports =
{
  entry: './src/main.js',
  output:
  {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  //eval-source-map for development
  //source-map for production
  devServer: {
    contentBase: './dist'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          ecma: 8,
          compress: {
            arrows: true,
            booleans: true,
            collapse_vars: false,
            comparisons: true,
            computed_props: true,
            conditionals: true,
            dead_code: true,
            drop_console: false,
            ecma: 6,
            evaluate: true,
            hoist_funs: false,
            hoist_props: false,
            //hoist_var tends to increase file size if enabled
            hoist_vars: false,
            if_return: true,
            inline: 1,
            join_vars: true,
            keep_infinity: true,
            loops: true,
            negate_iife: false,
            passes: 3,
            properties: false,
            reduce_funcs: true,
            reduce_vars: true,
            sequences: 5,
            side_effects: false,
            switches: true,
            toplevel: false,
            top_retain: true,
            typeofs: false,
            unsafe: false,
            unused: false,
            warnings: false,
          },
        }
      })
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Pandemic',
      template: './src/index.html',
      inject: 'body'
    })
  ],
  performance:
  {
    hints: false
  },
  mode: 'development',
  module:
  {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /spec/
        ],
        loader: 'eslint-loader'
      }
    ]
  }
};
