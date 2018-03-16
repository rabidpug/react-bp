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
        icon  : 'frown-o',
        key   : 'item2',
        label : 'Bye',
        path  : '/bye',
      },
      {
        icon  : 'file-text',
        key   : 'item3',
        label : 'Todo',
        path  : '/todo',
      },
    ],
    path: '*',
  },
];

export default navMenu;
