import {
  ADD_TODO,
  TOGGLE_TODO,
  addTodo,
  toggleTodo,
} from './actions';
import { todos, todosInitialState, } from '.';

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

describe(
  'todos reducer', () => {
    it(
      'should handle ADD_TODO', () => {
        const todo = 'Todo 1';
        const expectedAction = [
          {
            completed : false,
            id        : 0,
            text      : todo,
          },
        ];

        expect( todos(
          todosInitialState, addTodo( todo )
        ) ).toEqual( expectedAction );
      }
    );

    it(
      'should handle TOGGLE_TODO', () => {
        const id = 0;
        const initialState = [
          {
            completed : false,
            id,
            text      : 'Todo 1',
          },
        ];
        const expectedAction = [
          {
            completed : true,
            id,
            text      : 'Todo 1',
          },
        ];

        expect( todos(
          initialState, toggleTodo( id )
        ) ).toEqual( expectedAction );
      }
    );
  }
);
