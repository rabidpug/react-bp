import { List, } from 'antd';
import React from 'react';
import TodoListItem from '../TodoListItem';
import { connect, } from 'react-redux';
import { getTodoVisibility, } from '../../store/todoVisibility/selectors';
import { getTodos, } from '../../store/todos/selectors';

const getVisibleTodos = (
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
};
const renderItem = item => <TodoListItem { ...item } />;
const mapStateToProps = state => ( {
  dataSource: getVisibleTodos(
    getTodos( state ), getTodoVisibility( state )
  ),
  header     : 'Your Todo Items',
  itemLayout : 'vertical',
  renderItem,
} );

const VisibleTodoList = connect( mapStateToProps )( List );

export default VisibleTodoList;
