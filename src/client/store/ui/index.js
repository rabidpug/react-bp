// @flow

import { IS_ONLINE, TOGGLE_KEY, TOGGLE_SIDEBAR, } from './types';
import { isOnlineReducer, toggleKeyReducer, toggleSidebarReducer, } from './reducers';

import { createReducer, } from '@acemarke/redux-starter-kit';

export const uiInitialState = {
  isOnline           : true,
  isSidebarCollapsed : true,
  openKeys           : [],
};

export const ui = createReducer( uiInitialState, {
  [IS_ONLINE]      : isOnlineReducer,
  [TOGGLE_KEY]     : toggleKeyReducer,
  [TOGGLE_SIDEBAR] : toggleSidebarReducer,
} );
