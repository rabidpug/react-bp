import { todoVisibility, todoVisibilityInitialState, } from 'Store/todoVisibility';

import { VisibilityFilters, } from 'Store/todoVisibility/types';
import { setVisibilityFilter, } from 'Store/todoVisibility/actions';

const { SHOW_ACTIVE, } = VisibilityFilters;

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
