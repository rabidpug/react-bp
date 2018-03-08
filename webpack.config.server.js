const webpack = require( 'webpack' );
const path = require( 'path' );
const nodeExternals = require( 'webpack-node-externals' );
const StartServerPlugin = require( 'start-server-webpack-plugin' );

const ENV = process.env.NODE_ENV;
const isProd = ENV === 'production';

const config = {
  entry: { server: [
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
  output: { filename : '[name].js',
            path     : path.resolve( 'dist' ), },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin( { 'process.env': { BUILD_TARGET : JSON.stringify( 'server' ),
                                                 NODE_ENV     : JSON.stringify( isProd ? 'production' : 'development' ), }, } ),
  ],
  target : 'node',
  watch  : !isProd,
};

!isProd && config.plugins.push( new StartServerPlugin( 'server.js' ) );

module.exports = config;
