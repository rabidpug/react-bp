//@flow

import { createAction, } from 'redux-actions';

type stateType = Array<{ completed: boolean, id: number, text: string }>;
type toggleTodoActionType = {
  payload: number,
  type: string,
};
type addTodoActionType = {
  payload: string,
  type: string,
};

//Types
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

//Action Creators
export const addTodo: Function = createAction( ADD_TODO );
export const toggleTodo: Function = createAction( TOGGLE_TODO );

//Actions
export const addTodoAction = (
  state: stateType, action: addTodoActionType
) => {
  const text = action.payload;
  const completed = false;
  const id = state.length;

  state.push( {
    completed,
    id,
    text,
  } );
};
export const toggleTodoAction = (
  state: stateType, action: toggleTodoActionType
) => {
  const index = action.payload;

  state[index].completed = !state[index].completed;
};
