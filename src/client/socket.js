// @flow

import { IO_CLIENT_JOIN_ROOM, IO_CONNECT, IO_DISCONNECT, IO_SERVER_HELLO, IO_SERVER_RESPONSE, } from 'Shared/socket';

import socketIOClient from 'socket.io-client';
import store from 'Store';

export const socket = socketIOClient( window.location.host );

/* eslint-disable no-console */
const setUpSocket = ( reduxStore: Object ) => {
  socket.on( IO_CONNECT, () => {
    console.log( '[socket.io] Connected.' );

    socket.emit( IO_CLIENT_JOIN_ROOM, 'hello-1234' );
  } );

  socket.on( IO_SERVER_HELLO, serverMessage => {
    console.log( `[socket.io] Server: ${serverMessage}` );
  } );

  socket.on( IO_SERVER_RESPONSE, res => {
    if ( res.msg === 'User not authorized' ) {
      reduxStore.dispatch( store.user.set.refreshAuthToken(
        store.greeter.set.sayHello,
        res.values,
        store.greeter.set.sayHelloResponse,
        store.inProgress.types.GETTING_AUTH
      ) );
    } else reduxStore.dispatch( store.greeter.set.sayHelloResponse( res ) );
  } );

  socket.on( IO_DISCONNECT, () => {
    console.log( '[socket.io] Disconnected.' );
  } );
};
/* eslint-enable no-console */

export default setUpSocket;
