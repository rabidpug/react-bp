import { authEndpointRoute, profileEndpointRoute, } from 'Shared/routes';

import axios from 'axios';
import { push, } from 'react-router-redux';
import store from 'Store';

export const refreshAuthToken = (
  callback, data, failureCallback, inProgressToggle
) => dispatch => {
  const refreshToken = localStorage.getItem( 'refreshToken' ) || sessionStorage.getItem( 'refreshToken' );

  axios
    .post( authEndpointRoute( 'refresh' ), { refreshToken, } )
    .then( res => {
      if ( res.data.token ) {
        ( JSON.parse( localStorage.getItem( 'remember' ) ) ? localStorage : sessionStorage ).setItem( 'JWT', res.data.token );

        dispatch( store.inProgress.set.toggleInProgress( inProgressToggle ) );

        dispatch( callback( data ) );
      } else throw new Error( 'Token Refresh Failed' );
    } )
    .catch( e => {
      failureCallback && dispatch( failureCallback( e.response.data ) );

      dispatch( store.inProgress.set.toggleInProgress( inProgressToggle ) );

      dispatch( store.user.set.logoutUser() );
    } );
};
export const authSuccess = data => dispatch => {
  const storage = JSON.parse( localStorage.getItem( 'remember' ) ) ? localStorage : sessionStorage;

  storage.setItem( 'JWT', data.token );

  storage.setItem( 'refreshToken', data.refreshToken );

  dispatch( store.inProgress.set.toggleInProgress( store.inProgress.types.GETTING_AUTH ) );

  dispatch( store.user.set.authResponse( data ) );

  dispatch( push( '/profile' ) );
};
export const getProfile = () => dispatch => {
  dispatch( store.inProgress.set.toggleInProgress( store.inProgress.types.GETTING_PROFILE ) );

  axios.defaults.headers.common.Authorization = localStorage.getItem( 'JWT' ) || sessionStorage.getItem( 'JWT' );

  axios
    .get( profileEndpointRoute() )
    .then( res => {
      if ( !res ) throw new Error( 'No Data' );

      dispatch( store.inProgress.set.toggleInProgress( store.inProgress.types.GETTING_PROFILE ) );

      dispatch( store.user.set.profileResponse( res.data.profile ) );
    } )
    .catch( e => {
      if ( e.response.status === 401 ) {
        dispatch( refreshAuthToken(
          getProfile, null, store.user.set.profileResponse, store.inProgress.types.GETTING_PROFILE
        ) );
      } else {
        dispatch( store.inProgress.set.toggleInProgress( store.inProgress.types.GETTING_PROFILE ) );

        dispatch( store.user.set.profileResponse( e.response.data ) );
      }
    } );
};
export const authUser = ( { authType, values, } ) => dispatch => {
  dispatch( store.inProgress.set.toggleInProgress( store.inProgress.types.GETTING_AUTH ) );

  axios
    .post( authEndpointRoute( authType ), values )
    .then( res => {
      if ( !res ) throw new Error( { msg: 'Failed to authorize', } );

      if ( authType === 'register' ) {
        dispatch( authUser( {
          authType: 'login',
          values,
        } ) );
      } else dispatch( authSuccess( res.data ) );
    } )
    .catch( e => {
      dispatch( store.inProgress.set.toggleInProgress( store.inProgress.types.GETTING_AUTH ) );

      dispatch( store.user.set.authResponse( e.response.data ) );
    } );
};
export const changePublic = ( { key, value, } ) => dispatch => {
  dispatch( store.inProgress.set.toggleInProgress( store.inProgress.types.CHANGE_PUBLIC ) );

  axios.defaults.headers.common.Authorization = localStorage.getItem( 'JWT' ) || sessionStorage.getItem( 'JWT' );

  axios
    .post( profileEndpointRoute( 'public' ), {
      key,
      value,
    } )
    .then( res => {
      if ( !res ) throw new Error( 'Failed to authorize' );

      dispatch( store.inProgress.set.toggleInProgress( store.inProgress.types.CHANGE_PUBLIC ) );

      dispatch( store.user.set.changePublicResponse( res.data ) );
    } )
    .catch( e => {
      if ( e.response.status === 401 ) {
        dispatch( refreshAuthToken(
          changePublic,
          {
            key,
            value,
          },
          store.user.set.changePublicResponse,
          store.inProgress.types.GETTING_PROFILE
        ) );
      } else {
        dispatch( store.inProgress.set.toggleInProgress( store.inProgress.types.CHANGE_PUBLIC ) );

        dispatch( store.user.set.changePublicResponse( e.response.data ) );
      }
    } );
};
export const linkAuth = newToken => dispatch => {
  dispatch( store.inProgress.set.toggleInProgress( store.inProgress.types.GETTING_AUTH ) );

  axios.defaults.headers.common.Authorization = localStorage.getItem( 'JWT' ) || sessionStorage.getItem( 'JWT' );

  axios
    .post( authEndpointRoute( 'link' ), { newToken, } )
    .then( res => {
      localStorage.removeItem( 'tempToken' );

      localStorage.removeItem( 'tempRefreshToken' );

      localStorage.removeItem( 'profile' );

      if ( !res ) throw new Error( { msg: 'Failed to authorize', } );

      dispatch( authSuccess( res.data ) );
    } )
    .catch( e => {
      if ( e.response.status === 401 ) {
        dispatch( refreshAuthToken(
          linkAuth, newToken, store.user.set.authResponse, store.inProgress.types.GETTING_PROFILE
        ) );
      } else dispatch( store.user.set.authResponse( e.response.data ) );
    } );
};

export const changePassword = ( { values, changeType, } ) => dispatch => {
  dispatch( store.inProgress.set.toggleInProgress( store.inProgress.types.CHANGE_PASSWORD ) );

  axios.defaults.headers.common.Authorization = localStorage.getItem( 'JWT' ) || sessionStorage.getItem( 'JWT' );

  axios
    .post( authEndpointRoute( changeType ), { values, } )
    .then( res => {
      dispatch( store.user.set.changePasswordResponse( res.data ) );
    } )
    .catch( e => {
      if ( e.response.status === 401 && !e.response.data.msg ) {
        dispatch( refreshAuthToken( changePassword,
                                    {
                                      changeType,
                                      values,
                                    },
                                    store.user.set.changePasswordResponse ) );
      } else {
        dispatch( store.inProgress.set.toggleInProgress( store.inProgress.types.CHANGE_PASSWORD ) );

        dispatch( store.user.set.changePasswordResponse( e.response.data ) );
      }
    } );
};
