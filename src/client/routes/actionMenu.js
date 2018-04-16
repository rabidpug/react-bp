import store, { reduxStore, } from 'Store';

import TopBar from 'Components/TopBar';

const actionMenu = [
  {
    actionMenuItems: [
      {
        action          : () => reduxStore.dispatch( store.user.set.logoutUser() ),
        icon            : 'logout',
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
