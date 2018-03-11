import {
  TOGGLE_KEY,
  TOGGLE_SIDEBAR,
  toggleKey,
  toggleKeyAction,
  toggleSidebar,
  toggleSidebarAction,
} from './actions';

import { createReducer, } from '@acemarke/redux-starter-kit';

export const uiInitialState = { isSidebarCollapsed : true,
                                openKeys           : [], };

export const ui = createReducer(
  uiInitialState, { [TOGGLE_KEY]     : toggleKeyAction,
                    [TOGGLE_SIDEBAR] : toggleSidebarAction, }
);

describe(
  'toggleKey', () => {
    it(
      'should create an action to toggle the open keys', () => {
        const key = '1';
        const expectedAction = { payload : key,
                                 type    : TOGGLE_KEY, };

        expect( toggleKey( key ) ).toEqual( expectedAction );
      }
    );
  }
);

describe(
  'toggleSidebar', () => {
    it(
      'should create an action to toggle the sidebar', () => {
        const expectedAction = { type: TOGGLE_SIDEBAR, };

        expect( toggleSidebar() ).toEqual( expectedAction );
      }
    );
  }
);
