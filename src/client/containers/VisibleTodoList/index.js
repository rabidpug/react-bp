import TodoList from '../../components/TodoList';
import { connect, } from 'react-redux';
import { getTodoVisibility, } from '../../store/todoVisibility/selectors';
import { getTodos, } from '../../store/todos/selectors';
import { toggleTodo, } from '../../store/todos/actions';

const getVisibleTodos = (
  todos, filter
) => {
  switch ( filter ) {
  case 'SHOW_COMPLETED':
    return todos.filter( t => t.completed );
  case 'SHOW_ACTIVE':
    return todos.filter( t => !t.completed );
  case 'SHOW_ALL':
  default:
    return todos;
  }
};

const mapStateToProps = state => ( { todos: getVisibleTodos(
  getTodos( state ), getTodoVisibility( state )
), } );

const mapDispatchToProps = dispatch => ( { onTodoClick ( id ) {
  dispatch( toggleTodo( id ) );
}, } );

const VisibleTodoList = connect(
  mapStateToProps, mapDispatchToProps
)( TodoList );

export default VisibleTodoList;
