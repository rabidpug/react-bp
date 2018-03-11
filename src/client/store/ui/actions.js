import { createAction, } from 'redux-actions';

// Types
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const TOGGLE_KEY = 'TOGGLE_KEY';
// Action Creators
export const toggleSidebar = createAction( TOGGLE_SIDEBAR );
export const toggleKey = createAction( TOGGLE_KEY );
//Actions
export const toggleSidebarAction = state => {
  state.isSidebarCollapsed = !state.isSidebarCollapsed;
};
export const toggleKeyAction = (
  state, action
) => {
  const key = action.payload;

  state.openKeys.includes( key ) ? state.openKeys.splice(
    state.openKeys.indexOf( key ), 1
  ) : state.openKeys.push( key );
};
