const PurgecssPlugin = require( 'purgecss-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const fs = require( 'fs' );
const lessToJs = require( 'less-vars-to-js' );
const path = require( 'path' );
const glob = require( 'glob' );
const webpack = require( 'webpack' );

const PATHS = { src: path.resolve( 'src' ), };

const themeVariables = lessToJs( fs.readFileSync(
  path.resolve( 'theme.less' ), 'utf8'
) );
const ENV = process.env.NODE_ENV;
const isProd = ENV === 'production';
const extractSass = new ExtractTextPlugin( { disable  : !isProd,
                                             filename : 'styles/[name].styles.css', } );
const extractLess = new ExtractTextPlugin( { disable  : !isProd,
                                             filename : 'styles/[name].styles.css', } );
const extractCSS = new ExtractTextPlugin( { disable  : !isProd,
                                            filename : 'styles/[name].styles.css', } );

module.exports = {
  // devServer: {
  //   historyApiFallback : true,
  //   hot                : true,
  //   inline             : true,
  // },
  entry: { index: [
    'babel-polyfill',
    'react-hot-loader/babel',
    'webpack-hot-middleware/client',
    './src/client/index.js',
  ], },
  mode   : isProd ? 'production' : 'development',
  module : { rules: [
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
          options : { minimize: isProd, }, },
      ], },
    { test : /\.(sass|scss)$/,
      use  : extractSass.extract( { use: [
        { loader: 'style-loader', },
        { loader  : 'css-loader',
          options : { modules   : true,
                      sourceMap : !isProd, }, },
        { loader  : 'sass-loader',
          options : { modules   : true,
                      sourceMap : !isProd, }, },
      ], } ), },
    { test : /\.less$/,
      use  : extractLess.extract( { use: [
        { loader: 'style-loader', },
        { loader: 'css-loader', },
        { loader  : 'less-loader',
          options : { javascriptEnabled : true,
                      modifyVars        : themeVariables, }, },
      ], } ), },
    { test : /\.css$/,
      use  : extractCSS.extract( { fallback : 'style-loader',
                                   use      : [ { loader: 'css-loader', }, ], } ), },
    {
      loader  : require.resolve( 'url-loader' ),
      options : { limit : 10000,
                  name  : 'assets/[name].[hash:8].[ext]', },
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
  ], },
  optimization: { splitChunks: { cacheGroups: { commons: {
    chunks : 'all',
    name   : 'vendors',
    test   : /[\\/]node_modules[\\/]/,
  }, }, }, },
  output: {
    filename   : 'js/[name].bundle.js',
    path       : path.resolve( 'dist' ),
    publicPath : '/',
  },
  performance : { hints: false, },
  plugins     : [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin( { filename : 'index.html',
                             template : './src/client/index.html', } ),
    extractSass,
    extractLess,
    extractCSS,
    new PurgecssPlugin( { paths: glob.sync(
      `${PATHS.src}/**/*`, { nodir: true, }
    ), } ),
    new webpack.DefinePlugin( { 'process.env': { NODE_ENV: JSON.stringify( isProd ? 'production' : 'development' ), }, } ),
  ],
  resolve: { extensions: [
    '.less',
    '.js',
  ], },
  // watch: !isProd,
};
