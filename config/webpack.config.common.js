const {resolve, join} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
  target: 'web',
  entry: ['./src/client/index.js'],
  output: {
    publicPath: '/',
    path: resolve(__dirname, '..', 'build', 'client'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {sourceMap: IS_DEV}
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[local]',
                modules: true,
                sourceMap: IS_DEV
              }
            },
            {
              loader: 'sass-loader',
              options: {sourceMap: IS_DEV}
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [postcssPresetEnv()],
                sourceMap: IS_DEV
              }
            }
          ]
        })
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
	  {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
			name: 'img/[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
        new CopyWebpackPlugin([
            { from: './src/client/public/favicon.ico'}
        ]),
        new CopyWebpackPlugin([
              { from: './src/client/public/img', to:'img'}
        ]),
        new ExtractTextPlugin({
          filename: '[name].css',
          disable: IS_DEV
        }),
        new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
  resolve: {
    modules: ['node_modules', join('src', 'client')]
  },
  optimization: {
    splitChunks: {
      maxSize: 200000,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  stats: {
    assetsSort: '!size',
    children: false,
    chunks: false,
    colors: true,
    entrypoints: false,
    modules: false
  }
};
