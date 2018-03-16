import { SET_VISIBILITY_FILTER, VisibilityFilters, } from 'Store/todoVisibility/types';

import { setVisibilityFilter, } from 'Store/todoVisibility/actions';

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
