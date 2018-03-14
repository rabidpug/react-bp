import { getTodoVisibility, } from '../../../../src/client/store/todoVisibility/selectors';
import { todoVisibilityInitialState, } from '../../../../src/client/store/todoVisibility';

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
