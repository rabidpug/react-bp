import { NODE_ENV, PORT, } from 'Shared/env';

/*eslint-disable no-console */
import { Server, } from 'http';
import app from './server';
import dev from './routes/dev';
import setUpSocket from './config/socket';
import socketIO from 'socket.io';

const isDev = NODE_ENV !== 'production';

const SERVER_PORT = PORT || 8080;
const SERVER_HOST = PORT ? '0.0.0.0' : 'localhost';

const server = Server( app );

if ( isDev ) dev( app );
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
