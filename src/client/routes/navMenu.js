import HomeSideBar from 'Components/SideBar/HomeSideBar';
const navMenu = [
  {
    component : HomeSideBar,
    menuItems : [
      {
        icon    : 'home',
        key     : 'sub1',
        label   : 'Home',
        path    : '/',
        subMenu : [
          {
            icon  : 'home',
            key   : 'subitem1',
            label : 'Home Page',
            path  : '/',
          },
        ],
      },
      {
        icon  : 'smile-o',
        key   : 'item1',
        label : 'Welcome',
        path  : '/welcome',
      },
      {
        icon            : 'user-add',
        isAuthenticated : false,
        key             : 'item2',
        label           : 'Sign In/Up',
        path            : '/signin',
      },
      {
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
