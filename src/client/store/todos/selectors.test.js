import { getTodos, } from './selectors';
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
