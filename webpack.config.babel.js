import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const ENV = process.env.NODE_ENV;
const isProd = ENV === 'production';

const config = {
  devServer: {
    historyApiFallback : true,
    hot                : true,
    inline             : true,
  },
  entry: { index: [
    'babel-polyfill',
    'react-hot-loader/babel',
    './src/client/index.js',
  ],  },
  module: { rules: [
    {
      exclude : /node_modules/,
      loader  : 'babel-loader',
      test    : /\.js$/,
    },
    {
      exclude : /node_modules/,
      loader  : 'babel-loader',
      test    : /\.jsx$/,
    },
    { test : /\.html$/,
      use  : [
        { loader  : 'html-loader',
          options : { minimize: isProd, },  },
      ],  },
    { test : /\.(sass|scss)$/,
      use  : [
        { loader: 'style-loader', },
        { loader  : 'css-loader',
          options : { modules   : true,
                      sourceMap : !isProd,  },  },
        { loader  : 'sass-loader',
          options : { modules   : true,
                      sourceMap : !isProd,  },  },
      ],  },
    { test : /\.css$/,
      use  : ExtractTextPlugin.extract( { fallback : 'style-loader',
                                          use      : [
          { loader: 'css-loader', },
          { loader: 'sass-loader', },
        ],  } ),  },
    {
      loader  : require.resolve( 'url-loader' ),
      options : { limit : 10000,
                  name  : 'assets/[name].[hash:8].[ext]',  },
      test: [
        /\.bmp$/,
        /\.gif$/,
        /\.svg$/,
        /\.jpe?g$/,
        /\.png$/,
        /\.ttf$/,
        /\.woff$/,
        /\.woff2$/,
        /\.eot$/,
      ],
    },
  ],  },
  optimization: { splitChunks: { cacheGroups: { commons: {
    chunks : 'all',
    name   : 'vendors',
    test   : /[\\/]node_modules[\\/]/,
  },  },  },  },
  output: {
    filename   : 'js/[name].bundle.js',
    path       : path.resolve( 'dist' ),
    publicPath : '/',
  },
  performance : { hints: false,  },
  plugins     : [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin( { filename : 'index.html',
                             template : './src/client/index.html',  } ),
    new ExtractTextPlugin( { disable  : !isProd,
                             filename : 'styles/[name].styles.css',  } ),
  ],
  watch: !isProd,
};

export default config;
