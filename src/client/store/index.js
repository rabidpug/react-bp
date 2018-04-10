import * as reducers from './reducers';

import { combineReducers, } from '@acemarke/redux-starter-kit';
import { routerReducer, } from 'react-router-redux';

const reducer = combineReducers( { ...reducers,
                                   routing: routerReducer, } );

export default reducer;
