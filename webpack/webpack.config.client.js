/*eslint-disable camelcase */

const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const ManifestPlugin = require( 'webpack-manifest-plugin' );
const SWPrecacheWebpackPlugin = require( 'sw-precache-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const path = require( 'path' );

const fs = require( 'fs' );
const lessToJs = require( 'less-vars-to-js' );
const webpack = require( 'webpack' );

const dotenv = require( 'dotenv' );

dotenv.config();

const projectTitle = process.env.PROJECT_TITLE;
const themeVariables = lessToJs( fs.readFileSync(
  path.resolve( 'theme.less' ), 'utf8'
) );
const ENV = process.env.NODE_ENV;
const isProd = ENV === 'production';

const prodPlugs = [
  new HtmlWebPackPlugin( {
    favicon  : 'src/client/assets/favicon.ico',
    filename : 'index.html',
    template : './src/client/index.html',
    title    : projectTitle || 'configure env PROJECT_TITLE',
  } ),
  new MiniCssExtractPlugin( { chunkFilename : 'styles/[name].[hash].css',
                              filename      : 'styles/[name].[hash].css', } ),
  new ManifestPlugin( { fileName: 'asset-manifest.json', } ),
  new SWPrecacheWebpackPlugin( {
    dontCacheBustUrlsMatching : /\.\w{8}\./,
    filename                  : 'service-worker.js',
    logger ( message ) {
      if ( message.indexOf( 'Total precache size is' ) === 0 ) return;

      console.log(message); //eslint-disable-line
    },
    minify                        : true,
    navigateFallback              : '/index.html',
    navigateFallbackWhitelist     : [ /^(?!.*api)/, ],
    staticFileGlobsIgnorePatterns : [
      /\.map$/,
      /asset-manifest\.json$/,
    ],
  } ),
  new CopyWebpackPlugin( [ { from: 'src/client/pwa', }, ] ),
  new OptimizeCssAssetsPlugin( {
    assetNameRegExp     : /\.css$/g,
    canPrint            : true,
    cssProcessor        : require( 'cssnano' ),
    cssProcessorOptions : { preset: 'advanced', },
  } ),
];
const devPlugs = [ new webpack.HotModuleReplacementPlugin(), ];
const cssLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = {
  entry: { index: isProd
    ? [
      'babel-polyfill',
      './src/client/index.jsx',
    ]
    : [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      './src/client/index.jsx',
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
    { test : /\.(sass|scss)$/,
      use  : [
        { loader: cssLoader, },
        { loader  : 'css-loader',
          options : {
            importLoaders : 2,
            modules       : true,
            sourceMap     : !isProd,
          }, },
        { loader  : 'postcss-loader',
          options : { sourceMap: !isProd, }, },
        { loader  : 'sass-loader',
          options : { modules   : true,
                      sourceMap : !isProd, }, },
      ], },
    { test : /\.less$/,
      use  : [
        { loader: cssLoader, },
        { loader  : 'css-loader',
          options : { sourceMap: !isProd, }, },
        { loader  : 'postcss-loader',
          options : { sourceMap: !isProd, }, },
        { loader  : 'less-loader',
          options : {
            javascriptEnabled : true,
            modifyVars        : themeVariables,
            sourceMap         : !isProd,
          }, },
      ], },
    { test : /\.css$/,
      use  : [
        { loader: cssLoader, },
        { loader  : 'css-loader',
          options : {
            importLoaders : 1,
            modules       : true,
            sourceMap     : !isProd,
          }, },
        { loader  : 'postcss-loader',
          options : { sourceMap: !isProd, }, },
      ], },
    {
      loader  : 'url-loader',
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
    name   : 'vendor',
    test   : /[\\/]node_modules[\\/]/,
  }, }, }, },
  output: {
    filename   : 'js/[name].bundle.[hash].js',
    path       : path.resolve( 'dist' ),
    publicPath : '/',
  },
  plugins: [
    ...prodPlugs,
    ...isProd ? [] : devPlugs,
  ],
  resolve: { alias: {
    Animations: path.resolve(
      'src', 'client', 'animations'
    ),
    Assets: path.resolve(
      'src', 'client', 'assets'
    ),
    Client: path.resolve(
      'src', 'client'
    ),
    Components: path.resolve(
      'src', 'client', 'components'
    ),
    Containers: path.resolve(
      'src', 'client', 'containers'
    ),
    Routes: path.resolve(
      'src', 'client', 'routes'
    ),
    Scenes: path.resolve(
      'src', 'client', 'scenes'
    ),
    Server: path.resolve(
      'src', 'server'
    ),
    Shared: path.resolve(
      'src', 'shared'
    ),
    Store: path.resolve(
      'src', 'client', 'store'
    ),
    Styles: path.resolve(
      'src', 'client', 'styles'
    ),
  },
             extensions: [
               '.less',
               '.js',
               '.jsx',
               '.scss',
             ], },
  // watch: !isProd,
};
