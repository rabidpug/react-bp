import { Avatar, List, } from 'antd';

import React from 'react';
import { connect, } from 'react-redux';
import { getTodoVisibility, } from '../../store/todoVisibility/selectors';
import { getTodos, } from '../../store/todos/selectors';
import styles from './styles.scss';
import { toggleTodo, } from '../../store/todos/actions';

const { Item, } = List;
const { Meta, } = Item;
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
const mapStateToProps = state => ( {
  dataSource: getVisibleTodos(
    getTodos( state ), getTodoVisibility( state )
  ),
  header     : 'Your Todo Items',
  itemLayout : 'horizontal',
} );

const mapDispatchToProps = dispatch => ( { renderItem ( item ) {
  return (
    <Item
      className={ styles.todoItem }
      onClick={ () =>
        dispatch( toggleTodo( { completedDate : new Date(),
                                id            : item.id, } ) )
      }>
      <Meta
        avatar={ <Avatar icon={ item.completedDate ? 'check' : 'exclamation-circle-o' } /> }
        data-todo={ item.id }
        description={ `Created On: ${item.createdDate.toLocaleDateString()} at ${item.createdDate.toLocaleTimeString()}${
          item.completedDate
            ? `  ==> Completed On: ${item.completedDate.toLocaleDateString()} at ${item.completedDate.toLocaleTimeString()}`
            : ''
        }` }
        title={ item.text }
      />
    </Item>
  );
}, } );

const VisibleTodoList = connect(
  mapStateToProps, mapDispatchToProps
)( List );

export default VisibleTodoList;
