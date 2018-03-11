import {
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
  setVisibilityFilter,
  setVisibilityFilterAction,
} from './actions';

import { createReducer, } from '@acemarke/redux-starter-kit';

const { SHOW_ALL, SHOW_ACTIVE, } = VisibilityFilters;

export const todoVisibilityInitialState = SHOW_ALL;

export const todoVisibility = createReducer(
  todoVisibilityInitialState, { [SET_VISIBILITY_FILTER]: setVisibilityFilterAction, }
);

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
