// @flow

import { toggleKey, toggleSidebar, } from '../../store/ui/actions';

import Sidebar from '../../components/Sidebar';
import { connect, } from 'react-redux';
import { push, } from 'react-router-redux';

const mapStateToProps = (
  state, ownProps
) => ( {
  isSidebarCollapsed : state.ui.isSidebarCollapsed,
  menuItems          : ownProps.route.menuItems,
  openKeys           : state.ui.openKeys,
  router             : state.router,
} );

const mapDispatchToProps = dispatch => ( {
  goToPath ( path ) {
    dispatch( push( path ) );
  },
  toggleKey ( key ) {
    dispatch( toggleKey( key ) );
  },
  toggleSideBar () {
    dispatch( toggleSidebar() );
  },
} );

export default connect(
  mapStateToProps, mapDispatchToProps
)( Sidebar );
