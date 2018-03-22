//@flow

import { SET_VISIBILITY_FILTER, } from './types';
import { createAction, } from 'redux-actions';

export const setVisibilityFilter: Function = createAction( SET_VISIBILITY_FILTER );
