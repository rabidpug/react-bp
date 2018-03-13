import Link from '../../components/Link';
import { connect, } from 'react-redux';
import { setVisibilityFilter, } from '../../store/todoVisibility/actions';

const mapStateToProps = (
  state, ownProps
) => ( { icon  : ownProps.icon,
         label : ownProps.label, } );

const mapDispatchToProps = (
  dispatch, ownProps
) => ( { onClick () {
  dispatch( setVisibilityFilter( ownProps.filter ) );
}, } );

const FilterLink = connect(
  mapStateToProps, mapDispatchToProps
)( Link );

export default FilterLink;
