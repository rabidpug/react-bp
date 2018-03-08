import { createAction, } from 'redux-actions';

//Types
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

//Action Creators
export const addTodo = createAction( ADD_TODO );
export const toggleTodo = createAction( TOGGLE_TODO );

//Actions
export const addTodoAction = (
  state, action
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
  state, action
) => {
  const index = action.payload;

  state[index].completed = !state[index].completed;
};
