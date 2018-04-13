// @flow

import {
  IO_CLIENT_HELLO,
  IO_CLIENT_JOIN_ROOM,
  IO_CONNECT,
  IO_DISCONNECT,
  IO_SERVER_HELLO,
  IO_SERVER_RESPONSE,
} from 'Shared/socket';

import { PASSPORT_SECRET, } from 'Shared/env';
import User from '../models/User';
import jwt from 'jsonwebtoken';

/* eslint-disable no-console */
const setUpSocket = ( io: Object ) => {
  io.on( IO_CONNECT, socket => {
    console.log( '[socket.io] A client connected.' );

    socket.on( IO_CLIENT_JOIN_ROOM, room => {
      socket.join( room );

      console.log( `[socket.io] A client joined room ${room}.` );

      io.emit( IO_SERVER_HELLO, 'Hello everyone!' );

      io.to( room ).emit( IO_SERVER_HELLO, `Hello clients of room ${room}!` );

      socket.emit( IO_SERVER_HELLO, 'Hello you!' );
    } );

    socket.on( IO_CLIENT_HELLO, ( { message, token, } ) => {
      let user;

      try {
        user = jwt.verify( token.replace( 'JWT ', '' ), PASSPORT_SECRET, { complete: true, } );
      } catch ( e ) {
        user = {};

        io.emit( IO_SERVER_RESPONSE, 'User not authorized' );

        return;
      }

      User.findOne( { _id: user._id, } )
        .then( foundUser => {
          if ( !foundUser ) throw new Error( 'User not authorized' );

          console.log( `[socket.io] Client ${foundUser.profile.publicProfile.displayNames}: ${message}` );

          io.emit( IO_SERVER_RESPONSE, {
            message,
            timestamp   : new Date().getTime(),
            userProfile : foundUser.profile.publicProfile,
          } );
        } )
        .catch( e => io.emit( IO_SERVER_RESPONSE, e.message ) );
    } );

    socket.on( IO_DISCONNECT, () => {
      console.log( '[socket.io] A client disconnected.' );
    } );
  } );
};
/* eslint-enable no-console */

export default setUpSocket;
