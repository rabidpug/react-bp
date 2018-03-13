import { addTodo, newTodoValue, } from '../../store/todos/actions';

import { Input, } from 'antd';
import { connect, } from 'react-redux';
import { getNewTodoValue, } from '../../store/todos/selectors';
import { toggleTodoModal, } from '../../store/ui/actions';

const mapStateToProps = state => ( { placeholder : 'Add a Todo item...',
                                     value       : getNewTodoValue( state ), } );

const mapDispatchToProps = dispatch => ( { onChange ( e ) {
  dispatch( newTodoValue( e.target.value ) );
},
                                           onPressEnter () {
    dispatch( toggleTodoModal() );

    dispatch( addTodo( new Date() ) );
  }, } );

const AddTodoInput = connect(
  mapStateToProps, mapDispatchToProps
)( Input );

export default AddTodoInput;
