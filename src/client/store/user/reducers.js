export const authFailureReducer = (
  state, { payload, }
) => {
  state.authMessage = payload.msg;

  state.isGettingAuth = false;
};

export const authSuccessReducer = (
  state, { payload, }
) => {
  state.authMessage = payload.msg;

  state.isGettingAuth = false;

  state.token = payload.token;
};

export const authRequestReducer = state => {
  state.isGettingAuth = true;
};
