const webpack = require( 'webpack' );
const path = require( 'path' );
const nodeExternals = require( 'webpack-node-externals' );
const StartServerPlugin = require( 'start-server-webpack-plugin' );

const ENV = process.env.NODE_ENV;
const isProd = ENV === 'production';
const config = {
  entry: { server: isProd
    ? [
      'babel-polyfill',
      './src/server/index.js',
    ]
    : [
      'babel-polyfill',
      'webpack/hot/poll?1000',
      './src/server/index.js',
    ], },
  externals : [ nodeExternals( { whitelist: [ 'webpack/hot/poll?1000', ], } ), ],
  module    : { rules: [
    {
      exclude : /node_modules/,
      test    : /\.js?$/,
      use     : 'babel-loader',
    },
  ], },
  optimization : { minimize: false, },
  output       : { filename : '[name].js',
                   path     : path.resolve( 'dist' ), },
  plugins: isProd ? [] : [
    new webpack.HotModuleReplacementPlugin(),
    new StartServerPlugin( 'server.js' ),
  ],
  target : 'node',
  watch  : !isProd,
};

module.exports = config;
