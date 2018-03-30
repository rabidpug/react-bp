// @flow

import {
  IO_CLIENT_HELLO,
  IO_CLIENT_JOIN_ROOM,
  IO_CONNECT,
  IO_DISCONNECT,
  IO_SERVER_HELLO,
  IO_SERVER_RESPONSE,
} from 'Shared/socket';

/* eslint-disable no-console */
const setUpSocket = ( io: Object ) => {
  io.on(
    IO_CONNECT, socket => {
      console.log( '[socket.io] A client connected.' );

      socket.on(
        IO_CLIENT_JOIN_ROOM, room => {
          socket.join( room );

          console.log( `[socket.io] A client joined room ${room}.` );

          io.emit(
            IO_SERVER_HELLO, 'Hello everyone!'
          );

          io.to( room ).emit(
            IO_SERVER_HELLO, `Hello clients of room ${room}!`
          );

          socket.emit(
            IO_SERVER_HELLO, 'Hello you!'
          );
        }
      );

      socket.on(
        IO_CLIENT_HELLO, clientMessage => {
          console.log( `[socket.io] Client: ${clientMessage}` );

          io.emit(
            IO_SERVER_RESPONSE, clientMessage
          );
        }
      );

      socket.on(
        IO_DISCONNECT, () => {
          console.log( '[socket.io] A client disconnected.' );
        }
      );
    }
  );
};
/* eslint-enable no-console */

export default setUpSocket;