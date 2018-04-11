import {
  Home,
  UserForm,
  UserProfile,
  Welcome,
} from 'Components/Loadables';

import SideBar from 'Components/SideBar';

const navMenu = [
  {
    component : SideBar,
    menuItems : [
      {
        component : Home,
        icon      : 'home',
        key       : 'sub1',
        label     : 'Home',
        path      : '/',
        subMenu   : [
          {
            component : Home,
            icon      : 'home',
            key       : 'subitem1',
            label     : 'Home Page',
            path      : '/',
          },
        ],
      },
      {
        component       : Welcome,
        icon            : 'smile-o',
        isAuthenticated : true,
        key             : 'item1',
        label           : 'Welcome',
        path            : '/welcome',
      },
      {
        component       : UserForm,
        icon            : 'user-add',
        isAuthenticated : false,
        key             : 'item2',
        label           : 'Sign In/Up',
        path            : '/signin',
      },
      {
        component       : UserProfile,
        icon            : 'user',
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
