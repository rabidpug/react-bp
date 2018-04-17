import produce from 'immer';
import types from '../types';

const reducers = {
  [types.AUTH_RESPONSE]: produce( ( state, { payload: { msg, profile, }, } ) => {
    state.authMessage = msg || '';

    state.isAuthenticated = !msg;

    state.profile = profile || {};
  } ),
  [types.CHANGE_PASSWORD_RESPONSE]: produce( ( state, { payload: { msg, profile, }, } ) => {
    state.changePasswordStatus = msg || null;

    if ( profile ) state.profile = profile;
  } ),
  [types.CHANGE_PUBLIC_RESPONSE]: produce( ( state, { payload: { msg, profile, }, } ) => {
    state.changingPublicMessage = msg || '';

    state.profile = profile || {};
  } ),
  [types.IS_AUTHENTICATED]: produce( state => {
    state.isAuthenticated = true;
  } ),
  [types.LOGOUT_USER] () {
    const storage = JSON.parse( localStorage.getItem( 'remember' ) ) ? localStorage : sessionStorage;

    storage.removeItem( 'JWT' );

    storage.removeItem( 'refreshToken' );

    return {};
  },
  [types.PROFILE_RESPONSE]: produce( ( state, { payload, } ) => {
    state.profile = payload;
  } ),
};

export default reducers;
