import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
const { NODE_ENV, } = process.env;
const clientRoutes = app => {
  const HTML_FILE = path.resolve(
    __dirname, 'index.html'
  );

  NODE_ENV === 'production' && app.use( favicon( path.resolve(
    __dirname, 'favicon.ico'
  ) ) );

  app.use( express.static( __dirname ) );

  app.get(
    '*', (
      req, res
    ) => {
      res.set(
        'content-type', 'text/html'
      );

      res.sendFile( HTML_FILE );
    }
  );
};

export default clientRoutes;
