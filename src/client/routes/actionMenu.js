import FilterLink from '../containers/FilterLink';
import HomeTopBar from '../containers/HomeTopBar';
import TodoTopBar from '../containers/TodoTopBar';
import { VisibilityFilters, } from '../store/todoVisibility/actions';

const actionMenu = [
  {
    actionMenuItems: [
      {
        action : () => alert( 'We Will Add A Todo' ),
        icon   : 'plus',
        key    : '1',
        label  : 'Add Todo',
      },
      {
        icon    : 'eye-o',
        key     : '2',
        label   : 'Show...',
        subMenu : [
          {
            component : FilterLink,
            filter    : VisibilityFilters.SHOW_ALL,
            icon      : 'bars',
            key       : VisibilityFilters.SHOW_ALL,
            label     : 'All',
          },
          {
            component : FilterLink,
            filter    : VisibilityFilters.SHOW_ACTIVE,
            icon      : 'exclamation-circle-o',
            key       : VisibilityFilters.SHOW_ACTIVE,
            label     : 'Active',
          },
          {
            component : FilterLink,
            filter    : VisibilityFilters.SHOW_COMPLETED,
            icon      : 'check',
            key       : VisibilityFilters.SHOW_COMPLETED,
            label     : 'Completed',
          },
        ],
      },
    ],
    component : TodoTopBar,
    exact     : true,
    path      : '/todo',
  },
  {
    actionMenuItems : [],
    component       : HomeTopBar,
    path            : '*',
  },
];

export default actionMenu;
