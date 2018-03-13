// @flow

import TopBar from '../../components/TopBar';
import { connect, } from 'react-redux';
import { getIsSidebarCollapsed, } from '../../store/ui/selectors';
import { getTodoVisibility, } from '../../store/todoVisibility/selectors';
import { toggleSidebar, } from '../../store/ui/actions';

const mapStateToProps = (
  state, ownProps
) => ( {
  actionMenuItems    : ownProps.route.actionMenuItems,
  isSidebarCollapsed : getIsSidebarCollapsed( state ),
  selectedActionKeys : getTodoVisibility( state ),
} );

const mapDispatchToProps = dispatch => ( { toggleSideBar () {
  dispatch( toggleSidebar() );
}, } );

const TodoTopBar = connect(
  mapStateToProps, mapDispatchToProps
)( TopBar );

export default TodoTopBar;
