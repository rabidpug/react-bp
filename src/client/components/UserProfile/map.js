import store from 'Store';
const { changePasswordResponse, changePublic, getProfile, changePassword, } = store.user.set;
const map = {
  Dispatch: {
    changePassword,
    changePasswordResponse,
    changePublic,
    getProfile,
  },
  State: state => ( {
    ...store.user.get.profile( state ),
    changePasswordStatus : store.user.get.changePasswordStatus( state ),
    changingPassword     : store.inProgress.get.inProgress( state, [ store.inProgress.types.CHANGING_PASSWORD, ] ),
    isChangingPublic     : store.inProgress.get.inProgress( state, [ store.inProgress.types.CHANGE_PUBLIC, ] ),
    isGettingProfile     : store.inProgress.get.inProgress( state, [ store.inProgress.types.GETTING_PROFILE, ] ),
  } ),
};

export default map;
