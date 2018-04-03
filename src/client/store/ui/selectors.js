import { createSelector, } from '@acemarke/redux-starter-kit';

export const getIsSidebarCollapsed = createSelector( [ 'ui.isSidebarCollapsed', ] );

export const getOpenKeys = createSelector( [ 'ui.openKeys', ] );

export const getIsUpdateAvailable = createSelector( [ 'ui.isUpdateAvailable', ] );
