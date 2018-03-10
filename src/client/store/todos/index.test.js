import {
  ADD_TODO,
  TOGGLE_TODO,
  addTodo,
  addTodoAction,
  toggleTodoAction,
} from './actions';

import { createReducer, } from '@acemarke/redux-starter-kit';

export const todosInitialState = [];

export const todos = createReducer(
  todosInitialState, { [ADD_TODO]    : addTodoAction,
                       [TOGGLE_TODO] : toggleTodoAction, }
);

describe(
  'addTodo', () => {
    it(
      'should create an action to add a todo', () => {
        const todo = 'Do This';
        const expectedAction = { payload : todo,
                                 type    : ADD_TODO, };

        expect( addTodo( todo ) ).toEqual( expectedAction );
      }
    );
  }
);
