import { Home, UserForm, UserProfile, Welcome, } from 'Components/Loadables';
import { faComments, faHome, faSignInAlt, faUser, } from '@fortawesome/free-solid-svg-icons';

import SideBar from 'Containers/SideBar';

const navMenu = [
  {
    component : SideBar,
    menuItems : [
      {
        component : Home,
        icon      : faHome,
        key       : 'sub1',
        label     : 'Home',
        path      : '/',
        subMenu   : [
          {
            component : Home,
            icon      : faHome,
            key       : 'subitem1',
            label     : 'Home Page',
            path      : '/',
          },
        ],
      },
      {
        component : Welcome,
        icon      : faComments,
        key       : 'subitem2',
        label     : 'Welcome',
        path      : '/welcome',
      },
      {
        component       : UserForm,
        icon            : faSignInAlt,
        isAuthenticated : false,
        key             : 'item2',
        label           : 'Sign In/Up',
        path            : '/signin',
      },
      {
        component       : UserProfile,
        icon            : faUser,
        isAuthenticated : true,
        key             : 'item4',
        label           : 'User Profile',
        path            : '/profile',
      },
    ],
    path: '*',
  },
];

export default navMenu;
