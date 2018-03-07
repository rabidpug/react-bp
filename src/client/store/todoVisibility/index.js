import { SET_VISIBILITY_FILTER, } from './types';
import { createReducer, } from '@acemarke/redux-starter-kit';
import { setVisibilityFilterAction, } from './actions';
import { todoVisibilityInitialState, } from './initialState';

const todoVisibility = createReducer(
  todoVisibilityInitialState, { [SET_VISIBILITY_FILTER]: setVisibilityFilterAction, }
);

export default todoVisibility;
