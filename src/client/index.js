import 'semantic-ui-css/semantic.min.css';

import { ConnectedRouter, routerMiddleware, } from 'react-router-redux';
import { configureStore, createDefaultMiddleware, } from '@acemarke/redux-starter-kit';

import App from './scenes/App';
import { Provider, } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import reducer from './store/rootReducer';

const history = createHistory();
const routerware = routerMiddleware( history );
const middleware = createDefaultMiddleware( routerware );
const store = configureStore( {
  devTools: process.env.NODE_ENV !== 'production',
  middleware,
  reducer,
} );

if ( process.env.NODE_ENV !== 'production' ) {
  if ( module.hot ) {
    module.hot.accept(
      './store/rootReducer', () => store.replaceReducer( require( './store/rootReducer' ).default )
    );
  }
}

ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById( 'root' )
);
