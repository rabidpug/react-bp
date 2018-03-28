import { createSelector, } from '@acemarke/redux-starter-kit';
export const getIsGettingAuth = createSelector( [ 'user.isGettingAuth', ] );
export const getAuthMessage = createSelector( [ 'user.authMessage', ] );
