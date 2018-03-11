import {
  TOGGLE_KEY,
  TOGGLE_SIDEBAR,
  toggleKey,
  toggleSidebar,
} from './actions';
import { ui, uiInitialState, } from '.';

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

describe(
  'ui', () => {
    it(
      'should handle toggling the open keys', () => {
        const key = '1';
        const expectedAction = { isSidebarCollapsed : true,
                                 openKeys           : [ '1', ], };

        expect( ui(
          uiInitialState, toggleKey( key )
        ) ).toEqual( expectedAction );
      }
    );

    it(
      'should handle toggling the sidebar', () => {
        const expectedAction = { isSidebarCollapsed : false,
                                 openKeys           : [], };

        expect( ui(
          uiInitialState, toggleSidebar()
        ) ).toEqual( expectedAction );
      }
    );
  }
);
