import {
  ADD_TODO,
  NEW_TODO_VALUE,
  TOGGLE_TODO,
} from 'Store/todos/types';
import {
  addTodo,
  newTodoValue,
  toggleTodo,
} from 'Store/todos/actions';

describe(
  'addTodo', () => {
    it(
      'should create an action to add a todo', () => {
        const todo = new Date();
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
        const id = `Todo 1${new Date()}`;
        const expectedAction = { payload : id,
                                 type    : TOGGLE_TODO, };

        expect( toggleTodo( id ) ).toEqual( expectedAction );
      }
    );
  }
);

describe(
  'newTodoValue', () => {
    it(
      'should create an action to update the new todo value', () => {
        const value = 'Test';
        const expectedAction = { payload : value,
                                 type    : NEW_TODO_VALUE, };

        expect( newTodoValue( value ) ).toEqual( expectedAction );
      }
    );
  }
);
