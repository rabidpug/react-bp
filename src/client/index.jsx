import 'react-hot-loader';

import { ConnectedRouter, routerMiddleware, } from 'react-router-redux';
import { configureStore, createDefaultMiddleware, } from '@acemarke/redux-starter-kit';

import App from 'Scenes/App';
import { Provider, } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { isOnline, } from 'Store/ui/actions';
import reducer from 'Store';
import registerServiceWorker from './registerServiceWorker';
import setUpSocket from './socket';

export const history = createHistory();
const routerware = routerMiddleware( history );
const middleware = createDefaultMiddleware( routerware );

export const store = configureStore( {
  devTools: process.env.NODE_ENV !== 'production',
  middleware,
  reducer,
} );

setUpSocket( store );

if ( process.env.NODE_ENV !== 'production' ) {
  if ( module.hot ) {
    module.hot.accept(
      './store', () => store.replaceReducer( require( './store' ).default )
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

window.addEventListener(
  'online', () => store.dispatch( isOnline( true ) )
);

window.addEventListener(
  'offline', () => store.dispatch( isOnline( false ) )
);

registerServiceWorker();
