import {
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
  setVisibilityFilter,
} from './actions';
import { todoVisibility, todoVisibilityInitialState, } from '.';

const { SHOW_ACTIVE, } = VisibilityFilters;

describe(
  'setVisibilityFilter', () => {
    it(
      'should create an action to set the visibility filter', () => {
        const filter = SHOW_ACTIVE;
        const expectedAction = { payload : filter,
                                 type    : SET_VISIBILITY_FILTER, };

        expect( setVisibilityFilter( filter ) ).toEqual( expectedAction );
      }
    );
  }
);

describe(
  'todoVisibility', () => {
    it(
      'should handle setting the visibility filter', () => {
        const filter = SHOW_ACTIVE;
        const expectedAction = SHOW_ACTIVE;

        expect( todoVisibility(
          todoVisibilityInitialState, setVisibilityFilter( filter )
        ) ).toEqual( expectedAction );
      }
    );
  }
);
