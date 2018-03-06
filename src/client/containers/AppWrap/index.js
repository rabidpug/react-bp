import * as reducers from '../../reducers';

import {
  ConnectedRouter,
  routerMiddleware,
  routerReducer,
} from 'react-router-redux';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';

import App from '../../components/App';
import { Provider, } from 'react-redux';
import React from 'react';
import ReduxThunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { hot, } from 'react-hot-loader';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createHistory();
const middleware = routerMiddleware( history );
const store = createStore(
  combineReducers( { ...reducers,
                     router: routerReducer,  } ), composeEnhancers( applyMiddleware(
    middleware, ReduxThunk
  ) )
);

const AppWrap = () => (

  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <App />
    </ConnectedRouter>
  </Provider>
);

export default hot( module )( AppWrap );
