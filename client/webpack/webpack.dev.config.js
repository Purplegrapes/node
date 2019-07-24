const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const DEBUG = process.env.mode !== 'production';
const cssLoaderWithModule = {
  importLoaders: 1,
  modules: true,
  localIdentName: DEBUG ? '[name]_[local]--[hash:base64:5]' : '[hash:base64:5]',
  sourceMap: DEBUG,
};

const cssLoaderWithoutModule = {
  sourceMap: DEBUG,
};


const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    sourceMap: DEBUG,
    plugins: () => [
      autoprefixer(),
    ],
  },
};
module.exports = {

  /*入口*/
  entry: {
    app: ['react-hot-loader/patch',path.join(__dirname, '../src/index.js')],
  },

  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    minimizer: [
      // 压缩JS
      new TerserPlugin({
        cache: true,
        parallel: true,
      }),
      // 压缩CSS
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  /*输出到dist文件夹，输出文件名字为bundle.js*/
  output: {
    path: path.join(__dirname, '../dist'),
    filename: DEBUG ? '[name].[hash].js' : '[name].js',
    chunkFilename: DEBUG ? '[name].[chunkhash].js' : '[name].js'
  },
  mode: process.env.mode,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [
        path.resolve(__dirname, '../node_modules'),
      ],
      use: [
        'react-hot-loader/webpack',
        'cache-loader',
        {
          loader: 'thread-loader',
          // loaders with equal options will share worker pools
          options: {
            // number of jobs a worker processes in parallel
            // defaults to 20
            workerParallelJobs: 50,
          },
        },
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: true,
          },
        },
      ],
    },{
      test: /[^_]\.less$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: DEBUG,
        },
      },
        'cache-loader',
        {
          loader: 'css-loader', // translates CSS into CommonJS
          options: cssLoaderWithModule,
        },
        postcssLoader,
        {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            javascriptEnabled: true,
            sourceMap: DEBUG,
          },
        }],
    },
      {
        test: /_\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: DEBUG,
          },
        },
          'cache-loader',
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: cssLoaderWithoutModule,
          }, postcssLoader, {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              javascriptEnabled: true,
              sourceMap: DEBUG,
            },
          }],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: DEBUG,
            },
          },
          'cache-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg)/,
        use: 'file-loader',
      }, {
        test: /\.(woff|eot|ttf)/,
        use: 'url-loader',
      }, {
        test: /\.(xlsx?|pdf)/,
        use: 'file-loader',
      }]
  },
  resolve: {
    extensions: ['.js', '.less'],
    alias: {
      shared: path.resolve(__dirname, '../shared'),
      src: path.resolve(__dirname, '../src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      hash: true,
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: DEBUG ? '[name].css' : '[name].[hash].css',
      chunkFilename: DEBUG ? '[name].css' : '[name].[hash].css',
    }),
  ],
  devtool: DEBUG ? 'inline-source-map' : false,
  devServer: {
    contentBase: [path.join(__dirname, '../dist'), path.resolve(__dirname, '../config')],
    port: 3000,
    historyApiFallback: true,
    proxy: {
      // '/bar-api': 'http://172.101.130.200:60002',
      '/api': 'http://localhost:4040',
      // '/bar-api': 'http://10.160.144.35:60002',
      // '/bar-api': 'http://ci.betalpha.com:61368/mock/13',
    },
  }
};