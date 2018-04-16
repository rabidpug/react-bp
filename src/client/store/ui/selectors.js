import createSelector from 'selectorator';

const selectors = {
  isOnline           : createSelector( [ 'ui.isOnline', ] ),
  isSidebarCollapsed : createSelector( [ 'ui.isSidebarCollapsed', ] ),
  openKeys           : createSelector( [ 'ui.openKeys', ] ),
};

export default selectors;
