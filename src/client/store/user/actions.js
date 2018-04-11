import {
  AUTH_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  CHANGE_PASSWORD_CLEAR,
  CHANGE_PASSWORD_COMPLETE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PUBLIC_FAILURE,
  CHANGE_PUBLIC_REQUEST,
  CHANGE_PUBLIC_SUCCESS,
  LOGOUT_USER,
  PROFILE_FAILURE,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  SET_IS_AUTHENTICATED,
} from './types';
import { authEndpointRoute, profileEndpointRoute, } from 'Shared/routes';

import axios from 'axios';
import { createActions, } from 'redux-actions';
import { push, } from 'react-router-redux';

export const {
  authSuccess,
  authFailure,
  authRequest,
  changePasswordComplete,
  changePasswordClear,
  changePasswordRequest,
  changePublicSuccess,
  changePublicFailure,
  changePublicRequest,
  logoutUser,
  setIsAuthenticated,
  profileSuccess,
  profileFailure,
  profileRequest,
} = createActions(
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_REQUEST,
  CHANGE_PASSWORD_COMPLETE,
  CHANGE_PASSWORD_CLEAR,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PUBLIC_SUCCESS,
  CHANGE_PUBLIC_FAILURE,
  CHANGE_PUBLIC_REQUEST,
  LOGOUT_USER,
  SET_IS_AUTHENTICATED,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_REQUEST
);
export const redirectedAuthSuccess = data => dispatch => {
  dispatch( authSuccess( data ) );

  dispatch( push( '/profile' ) );
};
export const getProfile = () => dispatch => {
  dispatch( profileRequest() );

  axios.defaults.headers.common.Authorization = localStorage.getItem( 'JWT' ) || sessionStorage.getItem( 'JWT' );

  axios
    .get( profileEndpointRoute() )
    .then( res => {
      if ( res && res.data.profile ) dispatch( profileSuccess( res.data.profile ) );
      else dispatch( profileFailure( 'No Data' ) );
    } )
    .catch( e => {
      dispatch( profileFailure( e.response.data ) );
    } );
};
export const authUser = ( authType, payload ) => dispatch => {
  dispatch( authRequest() );

  axios
    .post( authEndpointRoute( authType ), payload )
    .then( res => {
      if ( res && res.data.success ) {
        dispatch( authSuccess( res.data ) );

        dispatch( push( '/profile' ) );

        if ( authType === 'register' ) dispatch( authUser( 'login', payload ) );
      } else dispatch( authFailure( res.data ) );
    } )
    .catch( e => dispatch( authFailure( e.response.data ) ) );
};

export const changePublic = ( key, value ) => dispatch => {
  dispatch( changePublicRequest() );

  axios.defaults.headers.common.Authorization = localStorage.getItem( 'JWT' ) || sessionStorage.getItem( 'JWT' );

  axios
    .post( profileEndpointRoute( 'public' ), {
      key,
      value,
    } )
    .then( res => {
      if ( res.data.success ) dispatch( changePublicSuccess( res.data ) );
      else dispatch( changePublicFailure( res.data ) );
    } )
    .catch( e => dispatch( changePublicFailure( e.response.data ) ) );
};
export const linkAuth = ( currentToken, newToken ) => dispatch => {
  dispatch( authRequest() );

  axios.defaults.headers.common.Authorization = currentToken;

  axios
    .post( authEndpointRoute( 'link' ), { newToken, } )
    .then( res => {
      localStorage.removeItem( 'tempToken' );

      localStorage.removeItem( 'profile' );

      if ( res.data.success ) dispatch( redirectedAuthSuccess( res.data ) );
      else dispatch( authFailure( res.data ) );
    } )
    .catch( e => dispatch( authFailure( e.response.data ) ) );
};

export const changePassword = ( { values, type, } ) => dispatch => {
  dispatch( changePasswordRequest() );

  axios.defaults.headers.common.Authorization = localStorage.getItem( 'JWT' ) || sessionStorage.getItem( 'JWT' );

  axios
    .post( authEndpointRoute( type ), { values, } )
    .then( res => {
      dispatch( changePasswordComplete( res.data ) );
    } )
    .catch( e => dispatch( changePasswordComplete( e.response.data ) ) );
};
