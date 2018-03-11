import { VisibilityFilters, } from './types';
import { setVisibilityFilter, } from './actions';
import { todoVisibility, } from '..';
import { todoVisibilityInitialState, } from '.';

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
