import { addTodo, toggleTodo, } from './actions';

import { todos, } from '.';

describe(
  'todos reducer', () => {
    it(
      'should handle ADD_TODO', () => {
        const date = new Date();
        const todoValue = 'My Todo Value';
        const initialState = { newTodoValue : todoValue,
                               todosArray   : [], };
        const expectedAction = { newTodoValue : '',
                                 todosArray   : [
            {
              completedDate : '',
              createdDate   : date,
              id            : 0,
              text          : todoValue,
            },
          ], };

        expect( todos(
          initialState, addTodo( date )
        ) ).toEqual( expectedAction );
      }
    );

    it(
      'should handle TOGGLE_TODO', () => {
        const id = 0;
        const completedDate = new Date();
        const createdDate = new Date( new Date().getTime() - 1e10 );
        const actionFeed = { completedDate,
                             id, };
        const initialState = { newTodoValue : '',
                               todosArray   : [
            {
              completedDate : '',
              createdDate,
              id,
              text          : 'Todo 1',
            },
          ], };
        const expectedAction = { newTodoValue : '',
                                 todosArray   : [
            {
              completedDate,
              createdDate,
              id,
              text: 'Todo 1',
            },
          ], };

        expect( todos(
          initialState, toggleTodo( actionFeed )
        ) ).toEqual( expectedAction );
      }
    );
  }
);
