import app from './server';
import http from 'http';

const server = http.createServer( app );
let currentApp = app;

const isDevelopment = process.env.NODE_ENV !== 'production';

server.listen( 3000 );

if ( isDevelopment ) {
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
} else {
  // server.on(
  //   'request', app
  // );
}
