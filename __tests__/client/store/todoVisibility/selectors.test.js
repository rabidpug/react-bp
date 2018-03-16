import { getTodoVisibility, } from 'Store/todoVisibility/selectors';
import { todoVisibilityInitialState, } from 'Store/todoVisibility';

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
