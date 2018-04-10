export const authFailureReducer = (
  state, { payload, }
) => {
  state.authMessage = payload.msg;

  state.isGettingAuth = false;

  state.isAuthenticated = false;
};

export const authSuccessReducer = (
  state, { payload, }
) => {
  state.authMessage = '';

  state.isGettingAuth = false;

  ( JSON.parse( localStorage.getItem( 'remember' ) ) ? localStorage : sessionStorage ).setItem(
    'JWT', payload.token
  );

  state.isAuthenticated = true;

  state.profile = payload.profile;
};
export const profileRequestReducer = state => {
  state.isGettingProfile = true;
};
export const profileSuccessReducer = (
  state, { payload, }
) => {
  state.isGettingProfile = false;

  state.profile = payload;
};
export const profileFailureReducer = (
  state, { payload, }
) => {
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
  localStorage.removeItem( 'JWT' );

  sessionStorage.removeItem( 'JWT' );

  return {};
};

export const changePublicRequestReducer = state => {
  state.isChangingPublic = true;
};
export const changePublicSuccessReducer = (
  state, { payload, }
) => {
  state.changingPublicMessage = '';

  state.isChangingPublic = false;

  ( JSON.parse( localStorage.getItem( 'remember' ) ) ? localStorage : sessionStorage ).setItem(
    'JWT', payload.token
  );

  state.profile = payload.profile;
};

export const changePublicFailureReducer = (
  state, { payload, }
) => {
  state.changingPublicMessage = payload.msg;

  state.isChangingPublic = false;
};
