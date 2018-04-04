import {
  AUTH_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  CHANGE_PUBLIC_FAILURE,
  CHANGE_PUBLIC_REQUEST,
  CHANGE_PUBLIC_SUCCESS,
  LOGOUT_USER,
} from './types';
import {
  authFailureReducer,
  authRequestReducer,
  authSuccessReducer,
  changePublicFailureReducer,
  changePublicRequestReducer,
  changePublicSuccessReducer,
  logoutUserReducer,
} from './reducers';

import { createReducer, } from '@acemarke/redux-starter-kit';

export const userInitialState = {};

export const user = createReducer(
  userInitialState, {
    [AUTH_FAILURE]          : authFailureReducer,
    [AUTH_REQUEST]          : authRequestReducer,
    [AUTH_SUCCESS]          : authSuccessReducer,
    [CHANGE_PUBLIC_FAILURE] : changePublicFailureReducer,
    [CHANGE_PUBLIC_REQUEST] : changePublicRequestReducer,
    [CHANGE_PUBLIC_SUCCESS] : changePublicSuccessReducer,
    [LOGOUT_USER]           : logoutUserReducer,
  }
);
