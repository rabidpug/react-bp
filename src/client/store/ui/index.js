// @flow

import { TOGGLE_SIDEBAR, toggleSidebarAction, } from './actions';

import { createReducer, } from '@acemarke/redux-starter-kit';

export const uiInitialState = { isSidebarCollapsed : true,
                                menuItems          : [
    {
      icon  : 'home',
      key   : '1',
      label : 'Home',
      path  : '/',
    },
    {
      icon  : 'smile-o',
      key   : '2',
      label : 'Welcome',
      path  : '/welcome',
    },
    {
      icon  : 'frown-o',
      key   : '3',
      label : 'Bye',
      path  : '/bye',
    },
    {
      icon  : 'file-text',
      key   : '4',
      label : 'Todo',
      path  : '/todo',
    },
  ], };

export const ui = createReducer(
  uiInitialState, { [TOGGLE_SIDEBAR]: toggleSidebarAction, }
);
