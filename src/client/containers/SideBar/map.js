import { push, } from 'react-router-redux';
import store from 'Store';
const { toggleKey, toggleSidebar, } = store.ui.set;
const map = {
  Dispatch: {
    push,

    toggleKey,
    toggleSidebar,
  },
  State: ( state, ownProps ) => ( {
    currentPath        : ownProps.location.pathname,
    isAuthenticated    : store.user.get.isAuthenticated( state ),
    isSidebarCollapsed : store.ui.get.isSidebarCollapsed( state ),
    menuItems          : ownProps.route.menuItems,
    openKeys           : store.ui.get.openKeys( state ),
  } ),
};

export default map;
