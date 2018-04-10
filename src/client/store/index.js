import * as reducers from './reducers';

import {
  combineReducers,
  configureStore,
  createDefaultMiddleware,
} from '@acemarke/redux-starter-kit';
import { routerMiddleware, routerReducer, } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

export const history = createHistory();
const routerware = routerMiddleware( history );
const middleware = createDefaultMiddleware( routerware );

const reducer = combineReducers( { ...reducers,
                                   routing: routerReducer, } );

const store = configureStore( {
  devTools: process.env.NODE_ENV !== 'production',
  middleware,
  reducer,
} );

export default store;
