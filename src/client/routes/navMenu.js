import HomeSideBar from 'Containers/HomeSideBar';

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
        icon            : 'login',
        isAuthenticated : false,
        key             : 'item2',
        label           : 'Log In',
        path            : '/login',
      },
      {
        icon            : 'user-add',
        isAuthenticated : false,
        key             : 'item3',
        label           : 'Register',
        path            : '/register',
      },
      {
        icon            : 'logout',
        isAuthenticated : true,
        key             : 'item4',
        label           : 'Log Out',
        path            : '/logout',
      },
    ],
    path: '*',
  },
];

export default navMenu;
