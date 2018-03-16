import { Modal, } from 'antd';
import { addTodo, } from 'Store/todos/actions';
import { connect, } from 'react-redux';
import { getTodoModalVisibility, } from 'Store/ui/selectors';
import { toggleTodoModal, } from 'Store/ui/actions';

const mapStateToProps = state => ( {
  okText  : 'Add Todo',
  title   : 'Add a new Todo',
  visible : getTodoModalVisibility( state ),
} );

const mapDispatchToProps = dispatch => ( { onCancel () {
  dispatch( toggleTodoModal() );
},
                                           onOk () {
    dispatch( toggleTodoModal() );

    dispatch( addTodo( new Date().toString() ) );
  }, } );

const AddTodoModal = connect(
  mapStateToProps, mapDispatchToProps
)( Modal );

export default AddTodoModal;
