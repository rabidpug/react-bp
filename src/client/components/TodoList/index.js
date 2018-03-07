// @flow

import React from 'react';
import Todo from '../Todo';

type Props = {
  onTodoClick: Function,
  todos: Array<{ completed: boolean, id: number, text: string }>,
};
const TodoList: Function = ( { todos, onTodoClick, }: Props ) => (
  <ul>
    {todos.map( todo =>
      ( <Todo
        key={ todo.id }
        { ...todo }
        onClick={ () => onTodoClick( todo.id ) } /> ) )}
  </ul>
);

export default TodoList;
