import HomeTopBar from 'Components/TopBar/HomeTopBar';
import { logoutUser, } from 'Store/user/actions';
import { store, } from '..';

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
    component : HomeTopBar,
    path      : '*',
  },
];

export default actionMenu;
