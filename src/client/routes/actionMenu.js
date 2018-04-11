import TopBar from 'Components/TopBar';
import { logoutUser, } from 'Store/user/actions';
import store from 'Store';

const actionMenu = [
  {
    actionMenuItems: [
      {
        action          : () => store.dispatch( logoutUser() ),
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
