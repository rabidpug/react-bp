import config from '../../webpack/webpack.config.client';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
const compiler = webpack( config );

const HTML_FILE = path.resolve(
  compiler.outputPath, 'index.html'
);

const dev = app => {
  app.use( webpackDevMiddleware(
    compiler, { publicPath: config.output.publicPath, }
  ) );

  app.use( webpackHotMiddleware( compiler ) );

  app.get(
    '*', (
      req, res, next
    ) => {
      compiler.outputFileSystem.readFile(
        HTML_FILE, (
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
};

export default dev;
