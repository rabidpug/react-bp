import * as asyncActions from './actions';

import { createActions, handleActions, } from 'redux-actions';

import reducers from './reducers';
import selectors from './selectors';

const initialState = {
  isAuthenticated : !!localStorage.getItem( 'JWT' ),
  profile         : {},
};
const actionCreators = createActions( {}, ...Object.keys( reducers ) );

export const rootReducer = handleActions( reducers, initialState );
export const user = {
  get : selectors,
  initialState,
  set : {
    ...actionCreators,
    ...asyncActions,
  },
};
