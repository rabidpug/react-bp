import 'react-hot-loader';

import store, { history, } from 'Store';

import App from 'Components/App';
import { ConnectedRouter, } from 'react-router-redux';
import { Provider, } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { isOnline, } from 'Store/ui/actions';
import registerServiceWorker from './registerServiceWorker';
import setUpSocket from './socket';

setUpSocket( store );

if ( process.env.NODE_ENV !== 'production' ) if ( module.hot ) module.hot.accept( './store', () => store.replaceReducer( require( './store' ).default ) );

ReactDOM.render( <Provider store={ store }>
  <ConnectedRouter history={ history }>
    <App />
  </ConnectedRouter>
</Provider>,
                 document.getElementById( 'root' ) );

window.addEventListener( 'online', () => store.dispatch( isOnline( true ) ) );

window.addEventListener( 'offline', () => store.dispatch( isOnline( false ) ) );

registerServiceWorker();
