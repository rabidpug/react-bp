import { createSelector, } from '@acemarke/redux-starter-kit';
export const getIsGettingAuth = createSelector( [ 'user.isGettingAuth', ] );
export const getAuthMessage = createSelector( [ 'user.authMessage', ] );
export const getIsAuthenticated = createSelector(
  [ 'user.token', ], token => !!token
);
export const getJWTToken = createSelector( [ 'user.token', ] );
export const getProfile = createSelector( {
  firstName : 'user.profile.firstName',
  lastName  : 'user.profile.lastName',
  photos    : 'user.profile.photos',
  providers : 'user.profile.providers',
} );