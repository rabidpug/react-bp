import { toggleKey, toggleSidebar, } from './actions';
import { ui, uiInitialState, } from '.';

describe(
  'ui', () => {
    it(
      'should handle toggling the collapse state of the sidebar', () => {
        const expectedAction = {
          isSidebarCollapsed  : false,
          openKeys            : [],
          todoModalVisibility : false,
        };

        expect( ui(
          uiInitialState, toggleSidebar()
        ) ).toEqual( expectedAction );
      }
    );

    it(
      'should add an open key when a user toggles a menu item open on the sidebar', () => {
        const key = '1';
        const expectedAction = {
          isSidebarCollapsed  : true,
          openKeys            : [ key, ],
          todoModalVisibility : false,
        };

        expect( ui(
          uiInitialState, toggleKey( key )
        ) ).toEqual( expectedAction );
      }
    );

    it(
      'should remove an open key when a user toggles a menu item closed on the sidebar', () => {
        const key = '1';
        const expectedAction = {
          isSidebarCollapsed  : true,
          openKeys            : [],
          todoModalVisibility : false,
        };
        const initialState = {
          isSidebarCollapsed  : true,
          openKeys            : [ '1', ],
          todoModalVisibility : false,
        };

        expect( ui(
          initialState, toggleKey( key )
        ) ).toEqual( expectedAction );
      }
    );
  }
);
