import store from 'Store';
import { toggleSidebar, } from 'Store/ui/actions';

const mapTopBar = {
  Dispatch : { toggleSidebar, },
  State    : ( state, ownProps ) => ( {
    actionMenuItems    : ownProps.route.actionMenuItems,
    isAuthenticated    : store.user.get.isAuthenticated( state ),
    isOnline           : store.ui.get.isOnline( state ),
    isSidebarCollapsed : store.ui.get.isSidebarCollapsed( state ),
    selectedActionKeys : [],
  } ),
};

export default mapTopBar;
