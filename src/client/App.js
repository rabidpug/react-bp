import 'semantic-ui-css/semantic.min.css';

import * as reducers from './store';

import {
  ConnectedRouter,
  routerMiddleware,
  routerReducer,
} from 'react-router-redux';
import {
  combineReducers,
  configureStore,
  createDefaultMiddleware,
} from '@acemarke/redux-starter-kit';

import Home from './scenes/Home';
import { Provider, } from 'react-redux';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { hot, } from 'react-hot-loader';

const history = createHistory();
const routerware = routerMiddleware( history );
const middleware = createDefaultMiddleware( routerware );
const reducer = combineReducers( { ...reducers,
                                   router: routerReducer, } );

const store = configureStore( {
  devTools: process.env.NODE_ENV !== 'production',
  middleware,
  reducer,
} );

if ( module.hot ) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept(
    './store', () => {
      const nextReducers = require( './store' );
      const nextReducer = combineReducers( { ...nextReducers,
                                             router: routerReducer, } );

      store.replaceReducer( nextReducer );
    }
  );
}
const App = () => (
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <Home />
    </ConnectedRouter>
  </Provider>
);

export default hot( module )( App );
