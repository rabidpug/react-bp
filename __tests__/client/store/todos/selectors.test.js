import {
  getNewTodoValue,
  getTodos,
  getVisibleTodos,
} from 'Store/todos/selectors';

import { todosInitialState, } from 'Store/todos';

const createdDate = new Date().toString();
const todoA = {
  completedDate : createdDate,
  createdDate,
  id            : `Todo 1${new Date( createdDate ).getTime()
    .toString( 36 )}`,
  text: 'Todo 1',
};
const todoB = {
  completedDate : '',
  createdDate,
  id            : `Todo 2${new Date( createdDate ).getTime()
    .toString( 36 )}`,
  text: 'Todo 2',
};

todosInitialState.todosArray.push( todoA );

todosInitialState.todosArray.push( todoB );

describe(
  'getTodos', () => {
    it(
      'should get the todos', () => {
        const state = { todos: todosInitialState, };
        const expectedAction = todosInitialState.todosArray;

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
      'should get all todos when passed the SHOW_ALL filter', () => {
        const todoVisibility = 'SHOW_ALL';
        const state = { todoVisibility,
                        todos: todosInitialState, };
        const expectedAction = todosInitialState.todosArray;

        expect( getVisibleTodos( state ) ).toEqual( expectedAction );
      }
    );

    it(
      'should get completed todos when passed the SHOW_COMPLETED filter', () => {
        const todoVisibility = 'SHOW_COMPLETED';
        const state = { todoVisibility,
                        todos: todosInitialState, };
        const expectedAction = [ todoA, ];

        expect( getVisibleTodos( state ) ).toEqual( expectedAction );
      }
    );

    it(
      'should get active todos when passed the SHOW_ACTIVE filter', () => {
        const todoVisibility = 'SHOW_ACTIVE';
        const state = { todoVisibility,
                        todos: todosInitialState, };
        const expectedAction = [ todoB, ];

        expect( getVisibleTodos( state ) ).toEqual( expectedAction );
      }
    );
  }
);
