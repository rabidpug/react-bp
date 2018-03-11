import { ADD_TODO, TOGGLE_TODO, } from './types';
import { addTodoReducer, toggleTodoReducer, } from './reducers';

import { createReducer, } from '@acemarke/redux-starter-kit';

export const todosInitialState = [];

export const todos = createReducer(
  todosInitialState, { [ADD_TODO]    : addTodoReducer,
                       [TOGGLE_TODO] : toggleTodoReducer, }
);
