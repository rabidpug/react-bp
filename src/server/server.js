import config from '../../webpack/webpack.config.client';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const { NODE_ENV, } = process.env;
const app = express(),
  isDev = NODE_ENV !== 'production';
console.log(NODE_ENV); //eslint-disable-line

if ( isDev ) {
  const compiler = webpack( config );

  const DEV_HTML_FILE = path.resolve(
    compiler.outputPath, 'index.html'
  );

  app.use( webpackDevMiddleware(
    compiler, { publicPath: config.output.publicPath, }
  ) );

  app.use( webpackHotMiddleware( compiler ) );

  app.get(
    '/api', (
      req, res
    ) => {
      res.send( { message: 'I am a server route and can also be hot reloaded! LIKE THIS!!!', } );
    }
  );

  app.get(
    '*', (
      req, res, next
    ) => {
      compiler.outputFileSystem.readFile(
        DEV_HTML_FILE, (
          err, result
        ) => {
          if ( err ) return next( err );

          res.set(
            'content-type', 'text/html'
          );

          res.send( result );

          res.end();
        }
      );
    }
  );
} else {
  app.use( express.static( 'dist' ) );

  app.get(
    '/api', (
      req, res
    ) => {
      res.send( { message: 'I am a server route and can also be hot reloaded! LIKE THIS!!!', } );
    }
  );

  app.use(
    '*', express.static( 'dist' )
  );
}

export default app;
