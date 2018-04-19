import store from 'Store';

const mapTopBar = {
  Dispatch : { toggleSidebar: store.ui.set.toggleSidebar, },
  State    : ( state, ownProps ) => ( {
    actionMenuItems    : ownProps.route.actionMenuItems,
    isAuthenticated    : store.user.get.isAuthenticated( state ),
    isOnline           : store.ui.get.isOnline( state ),
    isSidebarCollapsed : store.ui.get.isSidebarCollapsed( state ),
    selectedActionKeys : [],
  } ),
};

export default mapTopBar;
