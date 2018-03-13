// @flow

import {
  TOGGLE_KEY,
  TOGGLE_SIDEBAR,
  TOGGLE_TODO_MODAL,
} from './types';
import {
  toggleKeyReducer,
  toggleSidebarReducer,
  toggleTodoModalReducer,
} from './reducers';

import { createReducer, } from '@acemarke/redux-starter-kit';

export const uiInitialState = {
  isSidebarCollapsed  : true,
  openKeys            : [],
  todoModalVisibility : false,
};

export const ui = createReducer(
  uiInitialState, {
    [TOGGLE_KEY]        : toggleKeyReducer,
    [TOGGLE_SIDEBAR]    : toggleSidebarReducer,
    [TOGGLE_TODO_MODAL] : toggleTodoModalReducer,
  }
);
