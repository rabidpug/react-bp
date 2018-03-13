import AddTodoInput from '../../containers/AddTodoInput';
import AddTodoModal from '../../containers/AddTodoModal';
import React from 'react';
import VisibleTodoList from '../../containers/VisibleTodoList';

const TodoPage = () => (
  <div>
    <VisibleTodoList />
    <AddTodoModal>
      <AddTodoInput />
    </AddTodoModal>
  </div>
);

export default TodoPage;
