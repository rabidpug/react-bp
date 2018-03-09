import { Server, } from 'http';
import app from './server';

const { NODE_ENV, PORT, } = process.env;
const isDev = NODE_ENV !== 'production';
console.log(NODE_ENV, PORT); //eslint-disable-line

const SERVER_PORT = PORT || 3000;

if ( isDev ) {
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
