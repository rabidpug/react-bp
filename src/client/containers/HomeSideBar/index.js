// @flow

import { getIsSidebarCollapsed, getOpenKeys, } from '../../store/ui/selectors';
import { toggleKey, toggleSidebar, } from '../../store/ui/actions';

import Sidebar from '../../components/Sidebar';
import { connect, } from 'react-redux';
import { push, } from 'react-router-redux';

const mapStateToProps = (
  state, ownProps
) => ( {
  currentPath        : ownProps.location.pathname,
  isSidebarCollapsed : getIsSidebarCollapsed( state ),
  menuItems          : ownProps.route.menuItems,
  openKeys           : getOpenKeys( state ),
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

const HomeSideBar = connect(
  mapStateToProps, mapDispatchToProps
)( Sidebar );

export default HomeSideBar;
