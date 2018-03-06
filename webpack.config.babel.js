import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const ENV = process.env.NODE_ENV;
const isTest = ENV === 'test';
const isProd = ENV === 'production';

const config = {
  devServer: {
    historyApiFallback : true,
    hot                : true,
    inline             : true,
  },
  devtool: isTest
    ? 'inline-source-map'
    : isProd
      ? 'cheap-module-source-map'
      : 'cheap-module-eval-source-map',
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
          options : { minimize: true, },  },
      ],  },
    { test : /\.(sass|scss)$/,
      use  : [
        { loader: 'style-loader', },
        { loader  : 'css-loader',
          options : { modules   : true,
                      sourceMap : true,  },  },
        { loader  : 'sass-loader',
          options : { modules   : true,
                      sourceMap : true,  },  },
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
                  name  : 'dist/assets/[name].[hash:8].[ext]',  },
      test: [
        /\.bmp$/,
        /\.gif$/,
        /\.jpe?g$/,
        /\.png$/,
      ],
    },
  ],  },
  output: {
    chunkFilename : '[name].bundle.js',
    filename      : '[name].bundle.js',
    path          : path.resolve( 'dist' ),
    publicPath    : '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebPackPlugin( { filename : 'index.html',
                             template : './src/client/index.html',  } ),
    new ExtractTextPlugin( { disable  : !isProd,
                             filename : 'styles/[name].styles.css',  } ),
  ],
  watch: !isProd,
};

export default config;
