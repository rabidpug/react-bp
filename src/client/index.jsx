import 'react-hot-loader';

import store, { history, reduxStore, } from 'Store';

import App from 'Containers/App';
import { ConnectedRouter, } from 'react-router-redux';
import DynamicThemeProvider from 'Containers/DynamicThemeProvider';
import { Provider, } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal, } from 'styled-components';
import registerServiceWorker from './registerServiceWorker';
import setUpSocket from './socket';
import styles from 'Styles';

setUpSocket( reduxStore );

if ( process.env.NODE_ENV !== 'production' ) if ( module.hot ) module.hot.accept( './store', () => reduxStore.replaceReducer( require( './store' ).reduxStore ) );

ReactDOM.render( <Provider store={ reduxStore }>
  <DynamicThemeProvider>
    <ConnectedRouter history={ history }>
      <App />
    </ConnectedRouter>
  </DynamicThemeProvider>
</Provider>,
                 document.getElementById( 'root' ) );

injectGlobal`

@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 100%;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
}
::selection {
  background: ${styles.get.colours.primary};
  color: #fff;
}
`;

window.addEventListener( 'online', () => reduxStore.dispatch( store.ui.set.isOnline( true ) ) );

window.addEventListener( 'offline', () => reduxStore.dispatch( store.ui.set.isOnline( false ) ) );

registerServiceWorker();
