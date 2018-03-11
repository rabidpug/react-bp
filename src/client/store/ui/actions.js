//@flow

import { createAction, } from 'redux-actions';

type stateType = { isSidebarCollapsed: boolean, openKeys: Array<string> };
type toggleKeyActionType = {
  payload: string,
  type: string,
};

// Types
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const TOGGLE_KEY = 'TOGGLE_KEY';
// Action Creators
export const toggleSidebar: Function = createAction( TOGGLE_SIDEBAR );
export const toggleKey: Function = createAction( TOGGLE_KEY );
//Actions
export const toggleSidebarAction = ( state: stateType ) => {
  state.isSidebarCollapsed = !state.isSidebarCollapsed;
};
export const toggleKeyAction = (
  state: stateType, action: toggleKeyActionType
) => {
  const key = action.payload;

  state.openKeys.includes( key ) ? state.openKeys.splice(
    state.openKeys.indexOf( key ), 1
  ) : state.openKeys.push( key );
};
