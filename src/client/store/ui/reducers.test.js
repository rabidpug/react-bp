import { toggleKey, toggleSidebar, } from './actions';
import { ui, uiInitialState, } from '.';

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
