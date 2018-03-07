import { ADD_TODO, TOGGLE_TODO, } from './types';

import { createAction, } from 'redux-actions';

export const addTodo = createAction( ADD_TODO );
export const toggleTodo = createAction( TOGGLE_TODO );
