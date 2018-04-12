export const authFailureReducer = ( state, { payload, } ) => {
  state.authMessage = payload.msg;

  state.isGettingAuth = false;

  state.isAuthenticated = false;
};

export const authSuccessReducer = ( state, { payload, } ) => {
  state.authMessage = '';

  state.isGettingAuth = false;

  const storage = JSON.parse( localStorage.getItem( 'remember' ) ) ? localStorage : sessionStorage;

  storage.setItem( 'JWT', payload.token );

  storage.setItem( 'refreshToken', payload.refreshToken );

  state.isAuthenticated = true;

  state.profile = payload.profile;
};
export const profileRequestReducer = state => {
  state.isGettingProfile = true;
};
export const changePasswordRequestReducer = state => {
  state.isChangingPassword = true;
};
export const changePasswordCompleteReducer = ( state, { payload, } ) => {
  state.isChangingPassword = false;

  state.changePasswordStatus = payload.msg;

  if ( payload.profile ) state.profile = payload.profile;
};
export const changePasswordClearReducer = state => {
  state.isChangingPassword = false;

  state.changePasswordStatus = null;
};
export const profileSuccessReducer = ( state, { payload, } ) => {
  state.profile = payload;
};
export const profileFailureReducer = ( state, { payload, } ) => {
  state.isGettingProfile = false;

  state.profileMessage = payload;
};
export const setIsAuthenticatedReducer = state => {
  state.isAuthenticated = true;
};
export const authRequestReducer = state => {
  state.isGettingAuth = true;
};

export const logoutUserReducer = () => {
  const storage = JSON.parse( localStorage.getItem( 'remember' ) ) ? localStorage : sessionStorage;

  storage.removeItem( 'JWT' );

  storage.removeItem( 'refreshToken' );

  return {};
};

export const changePublicRequestReducer = state => {
  state.isChangingPublic = true;
};
export const changePublicSuccessReducer = ( state, { payload, } ) => {
  state.changingPublicMessage = '';

  state.isChangingPublic = false;

  state.profile = payload.profile;
};

export const changePublicFailureReducer = ( state, { payload, } ) => {
  state.changingPublicMessage = payload.msg;

  state.isChangingPublic = false;
};
