import {
  ADD_TODO,
  TOGGLE_TODO,
  addTodo,
  addTodoAction,
  toggleTodo,
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

describe(
  'toggleTodo', () => {
    it(
      'should create an action to toggle a todo', () => {
        const id = 1;
        const expectedAction = { payload : id,
                                 type    : TOGGLE_TODO, };

        expect( toggleTodo( id ) ).toEqual( expectedAction );
      }
    );
  }
);
