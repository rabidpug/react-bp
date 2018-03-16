import {
  addTodo,
  deleteTodo,
  newTodoValue,
  toggleTodo,
} from 'Store/todos/actions';
import { todos, todosInitialState, } from 'Store/todos';

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
              id            : todoValue + new Date( date ).getTime()
                .toString( 36 ),
              text: todoValue,
            },
          ], };

        expect( todos(
          initialState, addTodo( date )
        ) ).toEqual( expectedAction );
      }
    );

    it(
      'should handle TOGGLE_TODO', () => {
        const completedDate = new Date();
        const createdDate = new Date( new Date().getTime() - 1e10 );
        const id = `Todo 1${new Date( createdDate ).getTime()
          .toString( 36 )}`;
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

    it(
      'should handle DELETE_TODO', () => {
        const createdDate = new Date( new Date().getTime() - 1e10 );
        const id = `Todo 1${new Date( createdDate ).getTime()
          .toString( 36 )}`;
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
                                 todosArray   : [], };

        expect( todos(
          initialState, deleteTodo( id )
        ) ).toEqual( expectedAction );
      }
    );

    it(
      'should handle NEW_TODO_VALUE', () => {
        const value = 'T';
        const expectedAction = { newTodoValue : value,
                                 todosArray   : [], };

        expect( todos(
          todosInitialState, newTodoValue( value )
        ) ).toEqual( expectedAction );
      }
    );
  }
);
