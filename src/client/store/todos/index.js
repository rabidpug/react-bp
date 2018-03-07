import { ADD_TODO, TOGGLE_TODO, } from './types';
import { addTodoAction, toggleTodoAction, } from './actions';

import { createReducer, } from '@acemarke/redux-starter-kit';
import { todosInitialState, } from './initialState';

const todo = createReducer(
  todosInitialState, { [ADD_TODO]    : addTodoAction,
                       [TOGGLE_TODO] : toggleTodoAction,  }
);

export default todo;
