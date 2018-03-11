import { SET_VISIBILITY_FILTER, VisibilityFilters, } from './types';

import { createReducer, } from '@acemarke/redux-starter-kit';
import { setVisibilityFilterReducer, } from './reducers';

const { SHOW_ALL, } = VisibilityFilters;

export const todoVisibilityInitialState = SHOW_ALL;

export const todoVisibility = createReducer(
  todoVisibilityInitialState, { [SET_VISIBILITY_FILTER]: setVisibilityFilterReducer, }
);
