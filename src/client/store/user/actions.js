import {
  AUTH_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  LOGOUT_USER,
} from './types';

import { authEndpointRoute, } from 'Shared/routes';
import axios from 'axios';
import { createAction, } from 'redux-actions';
import { push, } from 'react-router-redux';

export const authSuccess = createAction( AUTH_SUCCESS );
export const authFailure = createAction( AUTH_FAILURE );
export const authRequest = createAction( AUTH_REQUEST );
export const logoutUser = createAction( LOGOUT_USER );

export const authUser = (
  authType, payload
) => dispatch => {
  dispatch( authRequest() );

  axios
    .post(
      authEndpointRoute( authType ), payload
    )
    .then( res => {
      if ( res.data.success ) {
        dispatch( authSuccess( res.data ) );

        if ( authType === 'register' ) {
          dispatch( authUser(
            'login', payload
          ) );
        } else dispatch( push( '/' ) );
      } else dispatch( authFailure( res.data ) );
    } )
    .catch( e => dispatch( authFailure( e.response.data ) ) );
};
