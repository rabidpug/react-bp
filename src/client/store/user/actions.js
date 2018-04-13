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

export const refreshAuthToken = ( callback, data ) => dispatch => {
  const refreshToken = localStorage.getItem( 'refreshToken' ) || sessionStorage.getItem( 'refreshToken' );

  axios
    .post( authEndpointRoute( 'refresh' ), { refreshToken, } )
    .then( res => {
      if ( res.data.token ) {
        ( JSON.parse( localStorage.getItem( 'remember' ) ) ? localStorage : sessionStorage ).setItem( 'JWT', res.data.token );

        dispatch( callback( data ) );
      } else throw new Error( 'Token Refresh Failed' );
    } )
    .catch( () => dispatch( logoutUser() ) );
};
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
      if ( e.response.status === 401 ) dispatch( refreshAuthToken( getProfile ) );
      else dispatch( profileFailure( e.response.data ) );
    } );
};
export const authUser = ( { authType, values, } ) => dispatch => {
  dispatch( authRequest() );

  axios
    .post( authEndpointRoute( authType ), values )
    .then( res => {
      if ( !res ) throw new Error( { msg: 'Failed to authorize', } );

      if ( authType === 'register' ) {
        dispatch( authUser( {
          authType: 'login',
          values,
        } ) );
      } else {
        dispatch( authSuccess( res.data ) );

        dispatch( push( '/profile' ) );
      }
    } )
    .catch( e => dispatch( authFailure( e.response.data ) ) );
};

export const changePublic = ( { key, value, } ) => dispatch => {
  dispatch( changePublicRequest() );

  axios.defaults.headers.common.Authorization = localStorage.getItem( 'JWT' ) || sessionStorage.getItem( 'JWT' );

  axios
    .post( profileEndpointRoute( 'public' ), {
      key,
      value,
    } )
    .then( res => {
      if ( !res ) throw new Error( 'Failed to authorize' );

      dispatch( changePublicSuccess( res.data ) );
    } )
    .catch( e => {
      if ( e.response.status === 401 ) {
        dispatch( refreshAuthToken( changePublic, {
          key,
          value,
        } ) );
      } else dispatch( changePublicFailure( e.response.data ) );
    } );
};
export const linkAuth = newToken => dispatch => {
  dispatch( authRequest() );

  axios.defaults.headers.common.Authorization = localStorage.getItem( 'JWT' ) || sessionStorage.getItem( 'JWT' );

  axios
    .post( authEndpointRoute( 'link' ), { newToken, } )
    .then( res => {
      localStorage.removeItem( 'tempToken' );

      localStorage.removeItem( 'tempRefreshToken' );

      localStorage.removeItem( 'profile' );

      if ( !res ) throw new Error( { msg: 'Failed to authorize', } );

      dispatch( redirectedAuthSuccess( res.data ) );
    } )
    .catch( e => {
      if ( e.response.status === 401 ) dispatch( refreshAuthToken( linkAuth, newToken ) );
      else dispatch( authFailure( e.response.data ) );
    } );
};

export const changePassword = ( { values, type, } ) => dispatch => {
  dispatch( changePasswordRequest() );

  axios.defaults.headers.common.Authorization = localStorage.getItem( 'JWT' ) || sessionStorage.getItem( 'JWT' );

  axios
    .post( authEndpointRoute( type ), { values, } )
    .then( res => {
      dispatch( changePasswordComplete( res.data ) );
    } )
    .catch( e => {
      if ( e.response.status === 401 ) {
        dispatch( refreshAuthToken( changePassword, {
          type,
          values,
        } ) );
      } else dispatch( changePasswordComplete( e.response.data ) );
    } );
};
