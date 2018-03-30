/*eslint-disable no-console */
import { Server, } from 'http';
import app from './server';
import dotenv from 'dotenv';
import path from 'path';
import setUpSocket from './config/socket';
import socketIO from 'socket.io';

const { NODE_ENV, PORT, } = process.env;
const isDev = NODE_ENV !== 'production';

dotenv.config( path.resolve(
  __dirname, '../.env'
) );

console.log(
  NODE_ENV, PORT
);

const SERVER_PORT = PORT || 8080;
const SERVER_HOST = PORT ? '0.0.0.0' : 'localhost';

const server = Server( app );
let currentApp = app;
const io = socketIO(
  server, { pingInterval : 3000,
            pingTimeout  : 7000, }
);

setUpSocket( io );

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
