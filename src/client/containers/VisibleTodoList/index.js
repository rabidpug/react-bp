import {
  Avatar,
  Icon,
  List,
} from 'antd';
import { deleteTodo, toggleTodo, } from '../../store/todos/actions';

import React from 'react';
import { connect, } from 'react-redux';
import { getTodoVisibility, } from '../../store/todoVisibility/selectors';
import { getTodos, } from '../../store/todos/selectors';

const IconText = ( {
  type, text, onClick,
} ) => (
  <span onClick={ onClick }>
    <Icon
      style={ { marginRight: 8, } }
      type={ type } />
    {text}
  </span>
);
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
  itemLayout : 'vertical',
} );
const mapDispatchToProps = dispatch => ( { renderItem ( item ) {
  return (
    <Item
      actions={ [
        <IconText
          key='markit'
          onClick={ () =>
            dispatch( toggleTodo( { completedDate : new Date(),
                                    id            : item.id, } ) )
          }
          text={ item.completedDate ? 'Mark Incomplete' : 'Mark Completed' }
          type={ item.completedDate ? 'exclamation-circle-o' : 'check' }
        />,
        <IconText
          key='deleteit'
          onClick={ () => dispatch( deleteTodo( item.id ) ) }
          text='Delete'
          type='close-square-o' />,
      ] }
      extra={ <Avatar icon={ item.completedDate ? 'check' : 'exclamation-circle-o' } /> }>
      <Meta
        description={
          <div>
            {`Created On: ${new Date( item.createdDate ).toLocaleDateString()} at ${new Date( item.createdDate ).toLocaleTimeString()}`}
            {item.completedDate && <br />}
            {item.completedDate &&
                `Completed On: ${new Date( item.completedDate ).toLocaleDateString()} at ${new Date( item.completedDate ).toLocaleTimeString()}`}
          </div>
        }
        title={ item.text }
      />
    </Item>
  );
}, } );

const VisibleTodoList = connect(
  mapStateToProps, mapDispatchToProps
)( List );

export default VisibleTodoList;
