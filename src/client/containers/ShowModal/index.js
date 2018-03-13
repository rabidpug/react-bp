import Link from '../../components/Link';
import { connect, } from 'react-redux';
import { toggleTodoModal, } from '../../store/ui/actions';

const mapStateToProps = (
  state, ownProps
) => ( { icon  : ownProps.icon,
         label : ownProps.label, } );

const mapDispatchToProps = dispatch => ( { onClick () {
  dispatch( toggleTodoModal() );
}, } );

const ShowModal = connect(
  mapStateToProps, mapDispatchToProps
)( Link );

export default ShowModal;
