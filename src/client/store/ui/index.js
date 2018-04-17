// @flow

import * as asyncActions from './actions';

import { createActions, handleActions, } from 'redux-actions';

import reducers from './reducers';
import selectors from './selectors';

const initialState = {
  isOnline           : true,
  isSidebarCollapsed : true,
  openKeys           : [],
  theme              : 'main',
};
const actionCreators = createActions( {}, ...Object.keys( reducers ) );

export const rootReducer = handleActions( reducers, initialState );
export const ui = {
  get : selectors,
  initialState,
  set : {
    ...actionCreators,
    ...asyncActions,
  },
};
