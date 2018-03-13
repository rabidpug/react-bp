//@flow

import {
  TOGGLE_KEY,
  TOGGLE_SIDEBAR,
  TOGGLE_TODO_MODAL,
} from './types';

import { createAction, } from 'redux-actions';

export const toggleSidebar: Function = createAction( TOGGLE_SIDEBAR );
export const toggleKey: Function = createAction( TOGGLE_KEY );
export const toggleTodoModal: Function = createAction( TOGGLE_TODO_MODAL );
