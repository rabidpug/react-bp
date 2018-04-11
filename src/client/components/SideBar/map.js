import { getIsSidebarCollapsed, getOpenKeys, } from 'Store/ui/selectors';
import { toggleKey, toggleSidebar, } from 'Store/ui/actions';

import { getIsAuthenticated, } from 'Store/user/selectors';
import { push, } from 'react-router-redux';

const mapSideBar = {
  Dispatch: dispatch => ( {
    goToPath: path => dispatch( push( path ) ),

    toggleKey     : key => dispatch( toggleKey( key ) ),
    toggleSideBar : () => dispatch( toggleSidebar() ),
  } ),
  State: ( state, ownProps ) => ( {
    currentPath        : ownProps.location.pathname,
    isAuthenticated    : getIsAuthenticated( state ),
    isSidebarCollapsed : getIsSidebarCollapsed( state ),
    menuItems          : ownProps.route.menuItems,
    openKeys           : getOpenKeys( state ),
  } ),
};

export default mapSideBar;
