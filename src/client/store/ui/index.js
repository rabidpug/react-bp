// @flow

import {
  TOGGLE_KEY,
  TOGGLE_SIDEBAR,
  toggleKeyAction,
  toggleSidebarAction,
} from './actions';

import { createReducer, } from '@acemarke/redux-starter-kit';

export const uiInitialState = { isSidebarCollapsed : true,
                                openKeys           : [], };

export const ui = createReducer(
  uiInitialState, { [TOGGLE_KEY]     : toggleKeyAction,
                    [TOGGLE_SIDEBAR] : toggleSidebarAction, }
);
