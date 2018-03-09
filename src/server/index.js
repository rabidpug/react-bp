import { Server, } from 'http';
import app from './server';

const isDevelopment = process.env.NODE_ENV !== 'production';

if ( isDevelopment ) {
  const server = Server( app );
  let currentApp = app;

  server.listen( 3000 );

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
} else app.listen( 3000 );
