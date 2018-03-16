import AddTodoInput from 'Containers/AddTodoInput';
import AddTodoModal from 'Containers/AddTodoModal';
import React from 'react';
import VisibleTodoList from 'Containers/VisibleTodoList';

const TodoPage = () => (
  <div>
    <VisibleTodoList />
    <AddTodoModal>
      <AddTodoInput />
    </AddTodoModal>
  </div>
);

export default TodoPage;
