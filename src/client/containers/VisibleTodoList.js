import { List, } from 'antd';
import React from 'react';
import TodoListItem from './TodoListItem';
import { connect, } from 'react-redux';
import { getVisibleTodos, } from 'Store/todos/selectors';

const renderItem = item => <TodoListItem { ...item } />;
const mapStateToProps = state => ( {
  dataSource : getVisibleTodos( state ),
  header     : 'Your Todo Items',
  itemLayout : 'vertical',
  renderItem,
} );

const VisibleTodoList = connect( mapStateToProps )( List );

export default VisibleTodoList;
