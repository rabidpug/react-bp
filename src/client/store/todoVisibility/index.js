import {
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
  setVisibilityFilterAction,
} from './actions';

import { createReducer, } from '@acemarke/redux-starter-kit';

const { SHOW_ALL, } = VisibilityFilters;

const todoVisibilityInitialState = SHOW_ALL;

const todoVisibility = createReducer(
  todoVisibilityInitialState, { [SET_VISIBILITY_FILTER]: setVisibilityFilterAction, }
);

export default todoVisibility;
