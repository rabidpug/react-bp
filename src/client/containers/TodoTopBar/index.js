// @flow

import TopBar from '../../components/TopBar';
import { connect, } from 'react-redux';
import { toggleSidebar, } from '../../store/ui/actions';

const mapStateToProps = (
  state, ownProps
) => ( {
  actionMenuItems    : ownProps.route.actionMenuItems,
  isSidebarCollapsed : state.ui.isSidebarCollapsed,
  selectedActionKeys : state.todoVisibility,
} );

const mapDispatchToProps = dispatch => ( { toggleSideBar () {
  dispatch( toggleSidebar() );
}, } );

export default connect(
  mapStateToProps, mapDispatchToProps
)( TopBar );
