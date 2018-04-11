import { getIsOnline, getIsSidebarCollapsed, } from 'Store/ui/selectors';

import { getIsAuthenticated, } from 'Store/user/selectors';
import { toggleSidebar, } from 'Store/ui/actions';

const mapTopBar = {
  Dispatch : dispatch => ( { toggleSideBar: () => dispatch( toggleSidebar() ), } ),
  State    : ( state, ownProps ) => ( {
    actionMenuItems    : ownProps.route.actionMenuItems,
    isAuthenticated    : getIsAuthenticated( state ),
    isOnline           : getIsOnline( state ),
    isSidebarCollapsed : getIsSidebarCollapsed( state ),
    selectedActionKeys : [],
  } ),
};

export default mapTopBar;
