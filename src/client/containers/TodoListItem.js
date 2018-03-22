import { deleteTodo, toggleTodo, } from 'Store/todos/actions';

import ListItem from 'Components/ListItem';
import { connect, } from 'react-redux';

const mapStateToProps = (
  state, ownProps
) => ( {
  completedDate : ownProps.completedDate,
  createdDate   : ownProps.createdDate,
  text          : ownProps.text,
} );
const mapDispatchToProps = (
  dispatch, ownProps
) => ( { deleteTodoItem () {
  dispatch( deleteTodo( ownProps.id ) );
},
         toggleTodoItem () {
    dispatch( toggleTodo( { completedDate : new Date(),
                            id            : ownProps.id, } ) );
  }, } );

const TodoListItem = connect(
  mapStateToProps, mapDispatchToProps
)( ListItem );

export default TodoListItem;
