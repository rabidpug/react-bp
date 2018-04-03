import 'react-hot-loader';

import store, { history, } from 'Store';

import App from 'Scenes/App';
import { ConnectedRouter, } from 'react-router-redux';
import Loading from 'Components/Loading';
import { PersistGate, } from 'redux-persist/integration/react';
import { Provider, } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { authSuccess, } from 'Store/user/actions';
import { getJWTToken, } from 'Store/user/selectors';
import { isOnline, } from 'Store/ui/actions';
import { persistStore, } from 'redux-persist';
import registerServiceWorker from './registerServiceWorker';

const persistor = persistStore(
  store, null, () => {
    store.dispatch( isOnline( window.navigator.onLine ) );

    const token = localStorage.getItem( 'JWT' );
    const profile = localStorage.getItem( 'profile' );
    const currentToken = getJWTToken( store.getState() );
  if (currentToken) console.log(currentToken); //eslint-disable-line
    if ( token ) {
      store.dispatch( authSuccess( { profile: profile && JSON.parse( profile ),
                                     token, } ) );

      localStorage.removeItem( 'JWT' );

      localStorage.removeItem( 'profile' );
    }
  }
);

if ( process.env.NODE_ENV !== 'production' ) {
  if ( module.hot ) {
    module.hot.accept(
      './store/rootReducer', () => store.replaceReducer( require( './store/rootReducer' ).default )
    );
  }
}

ReactDOM.render(
  <Provider store={ store }>
    <PersistGate
      loading={ <Loading /> }
      persistor={ persistor }>
      <ConnectedRouter history={ history }>
        <App />
      </ConnectedRouter>
    </PersistGate>
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