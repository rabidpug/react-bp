import { createSelector, } from '@acemarke/redux-starter-kit';
export const getIsGettingAuth = createSelector( [ 'user.isGettingAuth', ] );
export const getAuthMessage = createSelector( [ 'user.authMessage', ] );
export const getIsAuthenticated = createSelector( [ 'user.isAuthenticated', ] );
export const getIsGettingProfile = createSelector( [ 'user.isGettingProfile', ] );
export const getProfileDetails = createSelector( {
  displayNames  : 'user.profile.displayNames',
  emails        : 'user.profile.emails',
  photos        : 'user.profile.photos',
  providers     : 'user.profile.providers',
  publicProfile : 'user.profile.publicProfile',
} );
export const getIsChangingPassword = createSelector( [ 'user.isChangingPassword', ] );
export const getChangePasswordStatus = createSelector( [ 'user.changePasswordStatus', ] );
export const getIsChangingPublic = createSelector( [ 'user.isChangingPublic', ] );
export const getPublicId = createSelector( [ 'user.profile.publicProfile.publicId', ] );
