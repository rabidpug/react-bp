import * as reducers from './reducers';
import * as store from './store';

import { applyMiddleware, combineReducers, createStore, } from 'redux';
import { routerMiddleware, routerReducer, } from 'react-router-redux';

import { composeWithDevTools, } from 'redux-devtools-extension/developmentOnly';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

export const history = createHistory();
const middleware = [
  routerMiddleware( history ),
  thunk,
];
const reducer = combineReducers( {
  ...reducers,
  routing: routerReducer,
} );

export const reduxStore = createStore( reducer, composeWithDevTools( applyMiddleware( ...middleware ) ) );

export default store;
