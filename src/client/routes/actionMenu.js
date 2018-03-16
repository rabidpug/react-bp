import FilterLink from 'Containers/FilterLink';
import HomeTopBar from 'Containers/HomeTopBar';
import ShowModal from 'Containers/ShowModal';
import TodoTopBar from 'Containers/TodoTopBar';
import { VisibilityFilters, } from 'Store/todoVisibility/types';

const actionMenu = [
  {
    actionMenuItems: [
      {
        component : ShowModal,
        icon      : 'plus',
        key       : '1',
        label     : 'Add Todo',
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
