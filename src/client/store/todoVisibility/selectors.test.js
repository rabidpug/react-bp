import { getTodoVisibility, } from './selectors';
import { todoVisibilityInitialState, } from '.';

describe(
  'getTodoVisibility', () => {
    it(
      'should get the current Todo Filter', () => {
        const state = { todoVisibility: todoVisibilityInitialState, };
        const expectedAction = todoVisibilityInitialState;

        expect( getTodoVisibility( state ) ).toEqual( expectedAction );
      }
    );
  }
);
