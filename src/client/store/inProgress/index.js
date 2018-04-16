import * as asyncActions from './actions';

import { createActions, handleActions, } from 'redux-actions';

import reducers from './reducers';
import selectors from './selectors';
import types from './types';

const initialState = {};
const actionCreators = createActions( {}, ...Object.keys( reducers ) );

export const rootReducer = handleActions( reducers, initialState );
export const inProgress = {
  get : selectors,
  initialState,
  set : {
    ...actionCreators,
    ...asyncActions,
  },
  types,
};
