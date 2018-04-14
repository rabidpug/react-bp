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
import webpush from './webpush';

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

    socket.on( IO_CLIENT_HELLO, ( { values, token, } ) => {
      let user;

      try {
        user = jwt.verify( token.replace( 'JWT ', '' ), PASSPORT_SECRET, { complete: true, } );
      } catch ( e ) {
        user = false;

        socket.emit( IO_SERVER_RESPONSE, {
          msg: 'User not authorized',
          values,
        } );

        return;
      }

      User.findOne( { _id: user._id, } )
        .then( foundUser => {
          if ( !foundUser ) throw new Error( 'User not authorized' );

          console.log( `[socket.io] Client ${foundUser.profile.publicProfile.displayNames}: ${values.message}` );

          io.emit( IO_SERVER_RESPONSE, {
            timestamp   : new Date().getTime(),
            userProfile : foundUser.profile.publicProfile,
            ...values,
          } );

          const messageNotification = {
            body  : values.message,
            scope : 'welcome',
            tag   : 'newmessage',
            title : `You've received a new message from ${foundUser.profile.displayNames}`,
          };

          User.find( {
            _id                        : { $ne: foundUser._id, },
            'profile.pushSubscription' : { $ne: null, },
          } )
            .then( users => {
              users.forEach( user =>
                webpush.sendNotification( user.profile.pushSubscription, JSON.stringify( messageNotification ) ) );
            } )
            .catch( e => console.log( e ) );
        } )
        .catch( e =>
          socket.emit( IO_SERVER_RESPONSE, {
            msg: e.message,
            values,
          } ) );
    } );

    socket.on( IO_DISCONNECT, () => {
      console.log( '[socket.io] A client disconnected.' );
    } );
  } );
};
/* eslint-enable no-console */

export default setUpSocket;
