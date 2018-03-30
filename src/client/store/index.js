import { configureStore, createDefaultMiddleware, } from '@acemarke/redux-starter-kit';

import createHistory from 'history/createBrowserHistory';
import { persistReducer, } from 'redux-persist';
import rootReducer from './rootReducer';
import { routerMiddleware, } from 'react-router-redux';
import setUpSocket from '../socket';
import storage from 'redux-persist/lib/storage';

const persistConfig = { key: 'root',
                        storage, };
const reducer = persistReducer(
  persistConfig, rootReducer
);

export const history = createHistory();
const routerware = routerMiddleware( history );
const middleware = createDefaultMiddleware( routerware );
const store = configureStore( {
  devTools: process.env.NODE_ENV !== 'production',
  middleware,
  reducer,
} );

setUpSocket( store );

export default store;
