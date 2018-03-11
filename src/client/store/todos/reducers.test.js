import { addTodo, toggleTodo, } from './actions';
import { todos, todosInitialState, } from '.';

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
