import {
  AUTH_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
} from './types';
import {
  authFailureReducer,
  authRequestReducer,
  authSuccessReducer,
} from './reducers';

import { createReducer, } from '@acemarke/redux-starter-kit';

export const userInitialState = { token: localStorage.getItem( 'jwtToken' ), };

export const user = createReducer(
  userInitialState, {
    [AUTH_FAILURE] : authFailureReducer,
    [AUTH_REQUEST] : authRequestReducer,
    [AUTH_SUCCESS] : authSuccessReducer,
  }
);
