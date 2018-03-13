import {
  ADD_TODO,
  DELETE_TODO,
  NEW_TODO_VALUE,
  TOGGLE_TODO,
} from './types';
import {
  addTodoReducer,
  deleteTodoReducer,
  newTodoValueReducer,
  toggleTodoReducer,
} from './reducers';

import { createReducer, } from '@acemarke/redux-starter-kit';

export const todosInitialState = { newTodoValue : '',
                                   todosArray   : [], };

export const todos = createReducer(
  todosInitialState, {
    [ADD_TODO]       : addTodoReducer,
    [DELETE_TODO]    : deleteTodoReducer,
    [NEW_TODO_VALUE] : newTodoValueReducer,
    [TOGGLE_TODO]    : toggleTodoReducer,
  }
);
