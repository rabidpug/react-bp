export const authFailureReducer = (
  state, { payload, }
) => {
  state.authMessage = payload.msg;

  state.isGettingAuth = false;
};

export const authSuccessReducer = (
  state, { payload, }
) => {
  state.authMessage = '';

  state.isGettingAuth = false;

  state.token = payload.token;

  state.profile = payload.profile;
};

export const authRequestReducer = state => {
  state.isGettingAuth = true;
};

export const logoutUserReducer = () => ( {} );

export const changePublicRequestReducer = state => {
  state.isChangingPublic = true;
};
export const changePublicSuccessReducer = (
  state, { payload, }
) => {
  state.changingPublicMessage = '';

  state.isChangingPublic = false;

  state.token = payload.token;

  state.profile = payload.profile;
};

export const changePublicFailureReducer = (
  state, { payload, }
) => {
  state.changingPublicMessage = payload.msg;

  state.isChangingPublic = false;
};
