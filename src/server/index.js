import { Server, } from 'http';
import app from './server';

const isDevelopment = process.env.NODE_ENV !== 'production';
const SERVER_PORT = process.env.PORT || 3000;

if ( isDevelopment ) {
  const server = Server( app );
  let currentApp = app;

  server.listen( SERVER_PORT );

  if ( module.hot ) {
    module.hot.accept(
      './server', () => {
        server.removeListener(
          'request', currentApp
        );

        server.on(
          'request', app
        );

        currentApp = app;
      }
    );
  }
} else app.listen( SERVER_PORT );
