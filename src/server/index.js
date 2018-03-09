import { Server, } from 'http';
import app from './server';

const { NODE_ENV, PORT, } = process.env;
const isDev = NODE_ENV !== 'production';
console.log(NODE_ENV, PORT, process.env); //eslint-disable-line

const SERVER_PORT = PORT || 8080;
const SERVER_HOST = isDev ? 'localhost' : '0.0.0.0';

const server = Server( app );
let currentApp = app;

server.listen(
  SERVER_PORT,
  SERVER_HOST,
  () => console.log(`listening on port ${SERVER_PORT}`) //eslint-disable-line
);

if ( isDev ) {
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
}
// else server.on('request', app)
