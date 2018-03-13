import { getNewTodoValue, getTodos, } from './selectors';

import { todosInitialState, } from '.';

describe(
  'getTodos', () => {
    it(
      'should get the todos', () => {
        const state = { todos: todosInitialState, };
        const expectedAction = [];

        expect( getTodos( state ) ).toEqual( expectedAction );
      }
    );
  }
);

describe(
  'getNewTodoValue', () => {
    it(
      'should get the new todo value', () => {
        const state = { todos: todosInitialState, };
        const expectedAction = '';

        expect( getNewTodoValue( state ) ).toEqual( expectedAction );
      }
    );
  }
);
