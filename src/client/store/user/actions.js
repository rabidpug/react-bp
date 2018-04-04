import {
  AUTH_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  CHANGE_PUBLIC_FAILURE,
  CHANGE_PUBLIC_REQUEST,
  CHANGE_PUBLIC_SUCCESS,
  LOGOUT_USER,
} from './types';
import { authEndpointRoute, profileEndpointRoute, } from 'Shared/routes';

import axios from 'axios';
import { createActions, } from 'redux-actions';
import { getJWTToken, } from './selectors';

export const {
  authSuccess,
  authFailure,
  authRequest,
  changePublicSuccess,
  changePublicFailure,
  changePublicRequest,
  logoutUser,
} = createActions(
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_REQUEST,
  CHANGE_PUBLIC_SUCCESS,
  CHANGE_PUBLIC_FAILURE,
  CHANGE_PUBLIC_REQUEST,
  LOGOUT_USER
);

export const authUser = (
  authType, payload
) => dispatch => {
  dispatch( authRequest() );

  axios
    .post(
      authEndpointRoute( authType ), payload
    )
    .then( res => {
      if ( res && res.data.success ) {
        dispatch( authSuccess( res.data ) );

        if ( authType === 'register' ) {
          dispatch( authUser(
            'login', payload
          ) );
        }
      } else dispatch( authFailure( res.data ) );
    } )
    .catch( e => dispatch( authFailure( e.response.data ) ) );
};

export const changePublic = (
  key, value
) => (
  dispatch, getState
) => {
  dispatch( changePublicRequest() );

  axios.defaults.headers.common.Authorization = getJWTToken( getState() );

  axios
    .post(
      profileEndpointRoute( 'public' ), { key,
                                          value, }
    )
    .then( res => {
      if ( res.data.success ) dispatch( changePublicSuccess( res.data ) );
      else dispatch( changePublicFailure( res.data ) );
    } )
    .catch( e => dispatch( changePublicFailure( e.response.data ) ) );
};
