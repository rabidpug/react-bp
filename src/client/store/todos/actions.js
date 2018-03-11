//@flow

import { ADD_TODO, TOGGLE_TODO, } from './types';

import { createAction, } from 'redux-actions';

export const addTodo: Function = createAction( ADD_TODO );
export const toggleTodo: Function = createAction( TOGGLE_TODO );
