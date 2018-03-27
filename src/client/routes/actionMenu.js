import HomeTopBar from 'Containers/HomeTopBar';

const actionMenu = [
  {
    actionMenuItems: [
      {
        action: () => console.log('hi'), //eslint-disable-line
        icon   : 'eye-o',
        key    : '1',
        label  : 'Hello',
      },
    ],
    component : HomeTopBar,
    path      : '*',
  },
];

export default actionMenu;
