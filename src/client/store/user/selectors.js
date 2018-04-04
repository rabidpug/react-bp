import { createSelector, } from '@acemarke/redux-starter-kit';
export const getIsGettingAuth = createSelector( [ 'user.isGettingAuth', ] );
export const getAuthMessage = createSelector( [ 'user.authMessage', ] );
export const getIsAuthenticated = createSelector(
  [ 'user.token', ], token => !!token
);
export const getJWTToken = createSelector( [ 'user.token', ] );
export const getProfile = createSelector( {
  displayNames  : 'user.profile.displayNames',
  emails        : 'user.profile.emails',
  photos        : 'user.profile.photos',
  providers     : 'user.profile.providers',
  publicProfile : 'user.profile.publicProfile',
} );
