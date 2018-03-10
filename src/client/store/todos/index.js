import {
  ADD_TODO,
  TOGGLE_TODO,
  addTodoAction,
  toggleTodoAction,
} from './actions';

import { createReducer, } from '@acemarke/redux-starter-kit';

export const todosInitialState = [];

export const todos = createReducer(
  todosInitialState, { [ADD_TODO]    : addTodoAction,
                       [TOGGLE_TODO] : toggleTodoAction, }
);
