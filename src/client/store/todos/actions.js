//@flow

import {
  ADD_TODO,
  DELETE_TODO,
  NEW_TODO_VALUE,
  TOGGLE_TODO,
} from './types';

import { createAction, } from 'redux-actions';

export const addTodo: Function = createAction( ADD_TODO );
export const toggleTodo: Function = createAction( TOGGLE_TODO );
export const newTodoValue: Function = createAction( NEW_TODO_VALUE );
export const deleteTodo: Function = createAction( DELETE_TODO );
