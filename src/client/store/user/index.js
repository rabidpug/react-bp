import {
  AUTH_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  LOGOUT_USER,
} from './types';
import {
  authFailureReducer,
  authRequestReducer,
  authSuccessReducer,
  logoutUserReducer,
} from './reducers';

import { createReducer, } from '@acemarke/redux-starter-kit';

export const userInitialState = {};

export const user = createReducer(
  userInitialState, {
    [AUTH_FAILURE] : authFailureReducer,
    [AUTH_REQUEST] : authRequestReducer,
    [AUTH_SUCCESS] : authSuccessReducer,
    [LOGOUT_USER]  : logoutUserReducer,
  }
);
