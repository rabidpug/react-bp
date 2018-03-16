import { createSelector, } from '@acemarke/redux-starter-kit';
import { getTodoVisibility, } from '../todoVisibility/selectors';

export const getTodos = createSelector( [ 'todos.todosArray', ] );
export const getNewTodoValue = createSelector( [ 'todos.newTodoValue', ] );

export const getVisibleTodos = createSelector(
  [
    getTodos,
    getTodoVisibility,
  ], (
    todos, filter
  ) => {
    switch ( filter ) {
    case 'SHOW_COMPLETED':
      return todos.filter( t => t.completedDate );
    case 'SHOW_ACTIVE':
      return todos.filter( t => !t.completedDate );
    case 'SHOW_ALL':
    default:
      return todos;
    }
  }
);
