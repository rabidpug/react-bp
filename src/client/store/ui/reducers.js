import produce from 'immer';
import types from '../types';

const reducers = {
  [types.IS_ONLINE]: produce( ( state, { payload: isOnline, } ) => {
    state.isOnline = isOnline;
  } ),
  [types.TOGGLE_KEY]: produce( ( draft, { payload: key, } ) => {
    draft.openKeys.includes( key ) ? draft.openKeys.splice( draft.openKeys.indexOf( key ), 1 ) : draft.openKeys.push( key );
  } ),
  [types.TOGGLE_SIDEBAR]: produce( draft => {
    draft.isSidebarCollapsed = !draft.isSidebarCollapsed;
  } ),
};

export default reducers;
