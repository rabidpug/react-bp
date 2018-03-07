import InputSubmit from '../../components/InputSubmit';
import { addTodo, } from '../../store/todos/creators';
import { connect, } from 'react-redux';

const mapStateToProps = () => ( { label: 'Add Todo',  } );

const mapDispatchToProps = dispatch => ( { onSubmit ( todo ) {
  dispatch( addTodo( todo ) );
},  } );

export default connect(
  mapStateToProps, mapDispatchToProps
)( InputSubmit );
