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
