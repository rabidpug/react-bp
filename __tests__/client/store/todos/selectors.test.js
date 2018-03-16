import {
  getNewTodoValue,
  getTodos,
  getVisibleTodos,
} from 'Store/todos/selectors';

import { todosInitialState, } from 'Store/todos';

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

describe(
  'getNewTodoValue', () => {
    it(
      'should get the the todos matching the selected filter', () => {
        const state = { todos: todosInitialState, };
        const expectedAction = [];

        expect( getVisibleTodos( state ) ).toEqual( expectedAction );
      }
    );
  }
);
