//@flow

import { createAction, } from 'redux-actions';

type setVisibilityActionType = {
  type: string,
  payload: string,
};
// Types
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const VisibilityFilters = {
  SHOW_ACTIVE    : 'SHOW_ACTIVE',
  SHOW_ALL       : 'SHOW_ALL',
  SHOW_COMPLETED : 'SHOW_COMPLETED',
};

//Action Creators
export const setVisibilityFilter: Function = createAction( SET_VISIBILITY_FILTER );

//Actions
export const setVisibilityFilterAction = (
  state: string, action: setVisibilityActionType
) => action.payload;
