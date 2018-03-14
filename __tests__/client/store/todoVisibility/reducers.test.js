import { todoVisibility, todoVisibilityInitialState, } from '../../../../src/client/store/todoVisibility';

import { VisibilityFilters, } from '../../../../src/client/store/todoVisibility/types';
import { setVisibilityFilter, } from '../../../../src/client/store/todoVisibility/actions';

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
