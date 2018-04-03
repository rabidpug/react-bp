// @flow

import {
  TOGGLE_KEY,
  TOGGLE_SIDEBAR,
  TOGGLE_UPDATE,
} from './types';
import {
  toggleKeyReducer,
  toggleSidebarReducer,
  toggleUpdateReducer,
} from './reducers';

import { createReducer, } from '@acemarke/redux-starter-kit';

export const uiInitialState = {
  isSidebarCollapsed : true,
  isUpdateAvailable  : false,
  openKeys           : [],
};

export const ui = createReducer(
  uiInitialState, {
    [TOGGLE_KEY]     : toggleKeyReducer,
    [TOGGLE_SIDEBAR] : toggleSidebarReducer,
    [TOGGLE_UPDATE]  : toggleUpdateReducer,
  }
);
