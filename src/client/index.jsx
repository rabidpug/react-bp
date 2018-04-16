import 'react-hot-loader';

import store, { history, reduxStore, } from 'Store';

import App from 'Components/App';
import { ConnectedRouter, } from 'react-router-redux';
import { Provider, } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import setUpSocket from './socket';

setUpSocket( reduxStore );

if ( process.env.NODE_ENV !== 'production' ) if ( module.hot ) module.hot.accept( './store', () => reduxStore.replaceReducer( require( './store' ).reduxStore ) );

ReactDOM.render( <Provider store={ reduxStore }>
  <ConnectedRouter history={ history }>
    <App />
  </ConnectedRouter>
</Provider>,
                 document.getElementById( 'root' ) );

window.addEventListener( 'online', () => reduxStore.dispatch( store.ui.set.isOnline( true ) ) );

window.addEventListener( 'offline', () => reduxStore.dispatch( store.ui.set.isOnline( false ) ) );

registerServiceWorker();
