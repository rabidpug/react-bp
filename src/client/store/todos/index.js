import {
  ADD_TODO,
  TOGGLE_TODO,
  addTodoAction,
  toggleTodoAction,
} from './actions';

import { createReducer, } from '@acemarke/redux-starter-kit';

const todosInitialState = [];

const todo = createReducer(
  todosInitialState, { [ADD_TODO]    : addTodoAction,
                       [TOGGLE_TODO] : toggleTodoAction, }
);

export default todo;
