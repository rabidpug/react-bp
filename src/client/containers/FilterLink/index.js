import Link from '../../components/Link';
import { connect, } from 'react-redux';
import { setVisibilityFilter, } from '../../store/todoVisibility/creators';

const mapStateToProps = (
  state, ownProps
) => ( { active: ownProps.filter === state.todoVisibility,  } );

const mapDispatchToProps = (
  dispatch, ownProps
) => ( { onClick () {
  dispatch( setVisibilityFilter( ownProps.filter ) );
},  } );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Link );
