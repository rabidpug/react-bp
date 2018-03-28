export const authFailureReducer = (
  state, { payload, }
) => {
  state.authMessage = payload;

  state.isGettingAuth = false;
};

export const authSuccessReducer = (
  state, { payload, }
) => {
  state.token = payload;

  state.isGettingAuth = false;
};

export const authRequestReducer = state => {
  state.isGettingAuth = true;
};
