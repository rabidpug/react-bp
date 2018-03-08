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

describe(
  'index', () => {
    it(
      'renders without crashing', () => {
        ReactDOM.render(
          <Provider store={ store }>
            <ConnectedRouter history={ history }>
              <App />
            </ConnectedRouter>
          </Provider>,
          document.getElementById( 'root' ) || document.createElement( 'div' )
        );
      }
    );
  }
);
