import { createSelector, } from '@acemarke/redux-starter-kit';

export const getTodos = createSelector( [ 'todos.todosArray', ] );
export const getNewTodoValue = createSelector( [ 'todos.newTodoValue', ] );
