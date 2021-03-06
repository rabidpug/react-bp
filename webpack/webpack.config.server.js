const webpack = require( 'webpack' );
const path = require( 'path' );
const nodeExternals = require( 'webpack-node-externals' );
const StartServerPlugin = require( 'start-server-webpack-plugin' );
const dotenv = require( 'dotenv' );

dotenv.config();

const ENV = process.env.NODE_ENV;
const isProd = ENV === 'production';
const config = {
  entry: {
    server: isProd ? [ './src/server/index.js', ] : [
      'webpack/hot/signal',
      './src/server/index.js',
    ],
  },
  externals : [ nodeExternals( { whitelist: [ 'webpack/hot/signal', ], } ), ],
  module    : {
    rules: [
      {
        exclude : /node_modules/,
        test    : /\.js?$/,
        use     : 'babel-loader',
      },
    ],
  },
  node: {
    __dirname  : false,
    __filename : false,
  },
  optimization : { minimize: false, },
  output       : {
    filename : '[name].js',
    path     : path.resolve( 'dist' ),
  },
  plugins: isProd
    ? []
    : [
      new webpack.HotModuleReplacementPlugin(),
      new StartServerPlugin( {
        entryName : 'server',
        signal    : 'SIGUSR2',
      } ),
    ],
  resolve: {
    alias: {
      Animations : path.resolve( 'src', 'client', 'animations' ),
      Assets     : path.resolve( 'src', 'client', 'assets' ),
      Client     : path.resolve( 'src', 'client' ),
      Components : path.resolve( 'src', 'client', 'components' ),
      Containers : path.resolve( 'src', 'client', 'containers' ),
      Helpers    : path.resolve( 'src', 'client', 'helpers' ),
      Routes     : path.resolve( 'src', 'client', 'routes' ),
      Scenes     : path.resolve( 'src', 'client', 'scenes' ),
      Server     : path.resolve( 'src', 'server' ),
      Shared     : path.resolve( 'src', 'shared' ),
      Store      : path.resolve( 'src', 'client', 'store' ),
      Styles     : path.resolve( 'src', 'client', 'styles' ),
    },
    extensions: [
      '.less',
      '.js',
    ],
  },
  target : 'node',
  watch  : !isProd,
};

module.exports = config;
