import createSelector from 'selectorator';

const selectors = {
  authMessage          : createSelector( [ 'user.authMessage', ] ),
  changePasswordStatus : createSelector( [ 'user.changePasswordStatus', ] ),
  isAuthenticated      : createSelector( [ 'user.isAuthenticated', ] ),
  profile              : createSelector( [ 'user.profile', ] ),
  publicId             : createSelector( [ 'user.profile.publicProfile.publicId', ] ),
  pushSubscription     : createSelector( [ 'user.profile.pushSubscription', ] ),
};

export default selectors;
