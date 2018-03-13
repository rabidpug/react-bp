import { Modal, } from 'antd';
import { addTodo, } from '../../store/todos/actions';
import { connect, } from 'react-redux';
import { getTodoModalVisibility, } from '../../store/ui/selectors';
import { toggleTodoModal, } from '../../store/ui/actions';

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

    dispatch( addTodo( new Date() ) );
  }, } );

const AddTodoModal = connect(
  mapStateToProps, mapDispatchToProps
)( Modal );

export default AddTodoModal;
