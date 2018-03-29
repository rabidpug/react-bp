//@flow

import {
  SAY_HELLO_FAILURE,
  SAY_HELLO_REQUEST,
  SAY_HELLO_SUCCESS,
} from './types';

import axios from 'axios';
import { createAction, } from 'redux-actions';
import { getJWTToken, } from '../user/selectors';
import { helloEndpointRoute, } from 'Shared/routes';
import store from '..';

export const sayHelloRequest = createAction( SAY_HELLO_REQUEST );
export const sayHelloSuccess = createAction( SAY_HELLO_SUCCESS );
export const sayHelloFailure = createAction( SAY_HELLO_FAILURE );
export const sayHello: Function = ( num: number ) => ( dispatch: Function ) => {
  dispatch( sayHelloRequest() );

  axios.defaults.headers.common.Authorization = getJWTToken( store.getState() );

  axios
    .get( helloEndpointRoute( num ) )
    .then( res => {
      if ( !res.data && !res.data.message ) throw Error( 'No message received' );

      dispatch( sayHelloSuccess( res.data.message ) );
    } )
    .catch( () => {
      dispatch( sayHelloFailure() );
    } );
};
