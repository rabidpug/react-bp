// @flow

import TopBar from 'Components/TopBar';
import { connect, } from 'react-redux';
import { getIsSidebarCollapsed, } from 'Store/ui/selectors';
import { getTodoVisibility, } from 'Store/todoVisibility/selectors';
import { toggleSidebar, } from 'Store/ui/actions';

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
