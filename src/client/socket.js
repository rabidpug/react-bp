// @flow

import { IO_CLIENT_JOIN_ROOM, IO_CONNECT, IO_DISCONNECT, IO_SERVER_HELLO, IO_SERVER_RESPONSE, } from 'Shared/socket';
import { sayHello, sayHelloSuccess, } from 'Store/greeter/actions';

import { refreshAuthToken, } from 'Store/user/actions';
import socketIOClient from 'socket.io-client';

export const socket = socketIOClient( window.location.host );

/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const setUpSocket = ( store: Object ) => {
  socket.on( IO_CONNECT, () => {
    console.log( '[socket.io] Connected.' );

    socket.emit( IO_CLIENT_JOIN_ROOM, 'hello-1234' );
  } );

  socket.on( IO_SERVER_HELLO, serverMessage => {
    console.log( `[socket.io] Server: ${serverMessage}` );
  } );

  socket.on( IO_SERVER_RESPONSE, res => {
    if ( res.msg === 'User not authorized' ) store.dispatch( refreshAuthToken( sayHello, res.values ) );
    else store.dispatch( sayHelloSuccess( res ) );
  } );

  socket.on( IO_DISCONNECT, () => {
    console.log( '[socket.io] Disconnected.' );
  } );
};
/* eslint-enable no-console */

export default setUpSocket;
