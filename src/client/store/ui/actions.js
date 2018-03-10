import { createAction, } from 'redux-actions';

// Types
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

// Action Creators
export const toggleSidebar = createAction( TOGGLE_SIDEBAR );

//Actions
export const toggleSidebarAction = state => {
  state.isSidebarCollapsed = !state.isSidebarCollapsed;
};
