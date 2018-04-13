//@flow

import { SAY_HELLO_FAILURE, SAY_HELLO_REQUEST, SAY_HELLO_SUCCESS, } from './types';

import { IO_CLIENT_HELLO, } from 'Shared/socket';
// import axios from 'axios';
import { createAction, } from 'redux-actions';
// import { helloEndpointRoute, } from 'Shared/routes';
import { socket, } from '../../socket';

export const sayHelloRequest = createAction( SAY_HELLO_REQUEST );
export const sayHelloSuccess = createAction( SAY_HELLO_SUCCESS );
export const sayHelloFailure = createAction( SAY_HELLO_FAILURE );
export const sayHello: Function = value => ( dispatch: Function ) => {
  dispatch( sayHelloRequest() );

  const token = localStorage.getItem( 'JWT' ) || sessionStorage.getItem( 'JWT' );

  socket.emit( IO_CLIENT_HELLO, {
    token,
    ...value,
  } );
};
