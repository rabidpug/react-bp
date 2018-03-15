import { deleteTodo, toggleTodo, } from '../../store/todos/actions';

import ListItem from '../../components/ListItem';
import { connect, } from 'react-redux';

const mapDispatchToProps = (
  dispatch, ownProps
) => ( {
  deleteTodoItem () {
    dispatch( deleteTodo( ownProps.id ) );
  },
  toggleTodoItem () {
    dispatch( toggleTodo( { completedDate : new Date(),
                            id            : ownProps.id, } ) );
  },
  ...ownProps,
} );

const TodoListItem = connect(
  null, mapDispatchToProps
)( ListItem );

export default TodoListItem;
