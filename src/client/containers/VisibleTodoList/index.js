import TodoList from '../../components/TodoList';
import { connect, } from 'react-redux';
import { toggleTodo, } from '../../store/todos/creators';

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
  state.todos, state.todoVisibility
),  } );

const mapDispatchToProps = dispatch => ( { onTodoClick ( id ) {
  dispatch( toggleTodo( id ) );
},  } );

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)( TodoList );

export default VisibleTodoList;
