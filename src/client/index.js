import 'react-hot-loader';

import store, { history, } from 'Store';

import App from 'Scenes/App';
import { ConnectedRouter, } from 'react-router-redux';
import Loading from 'Components/Loading';
import { PersistGate, } from 'redux-persist/integration/react';
import { Provider, } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { persistStore, } from 'redux-persist';

const persistor = persistStore( store );

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
