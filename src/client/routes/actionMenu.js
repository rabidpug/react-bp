import store, { reduxStore, } from 'Store';

import TopBar from 'Containers/TopBar';
import { faSignOutAlt, } from '@fortawesome/free-solid-svg-icons';

const actionMenu = [
  {
    actionMenuItems: [
      {
        action          : () => reduxStore.dispatch( store.user.set.logoutUser() ),
        icon            : faSignOutAlt,
        isAuthenticated : true,
        key             : '1',
        label           : 'Log Out',
      },
    ],
    component : TopBar,
    path      : '/profile',
  },
  {
    actionMenuItems : [],
    component       : TopBar,
    path            : '*',
  },
];

export default actionMenu;
