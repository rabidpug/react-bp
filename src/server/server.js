import config from '../../webpack/webpack.config.client';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = express(),
  compiler = webpack( config ),
  isDevelopment = process.env.NODE_ENV !== 'production';

app.get(
  '/api', (
    req, res
  ) => {
    res.send( { message: 'I am a server route and can also be hot reloaded! LIKE THIS!!! hmmhehehe', } );
  }
);

if ( isDevelopment ) {
  const DEV_HTML_FILE = path.resolve(
    compiler.outputPath, 'index.html'
  );

  app.use( webpackDevMiddleware(
    compiler, { publicPath: config.output.publicPath, }
  ) );

  app.use( webpackHotMiddleware( compiler ) );

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
  const DIST_DIR = path.join(
      __dirname, '/'
    ),
    HTML_FILE = path.join(
      DIST_DIR, '/index.html'
    );

  app.use( express.static( DIST_DIR ) );

  app.get(
    '*', (
      req, res
    ) => res.sendFile( HTML_FILE )
  );
}

export default app;
