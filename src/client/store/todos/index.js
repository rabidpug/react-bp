import {
  ADD_TODO,
  NEW_TODO_VALUE,
  TOGGLE_TODO,
} from './types';
import {
  addTodoReducer,
  newTodoValueReducer,
  toggleTodoReducer,
} from './reducers';

import { createReducer, } from '@acemarke/redux-starter-kit';

export const todosInitialState = { newTodoValue : '',
                                   todosArray   : [], };

export const todos = createReducer(
  todosInitialState, {
    [ADD_TODO]       : addTodoReducer,
    [NEW_TODO_VALUE] : newTodoValueReducer,
    [TOGGLE_TODO]    : toggleTodoReducer,
  }
);
