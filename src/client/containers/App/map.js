import store from 'Store';
const { authSuccess, getProfile, linkAuth, } = store.user.set;
const { isOnline, } = store.ui.set;
const map = {
  Dispatch: {
    authSuccess,
    getProfile,
    isOnline,
    linkAuth,
  },
  State: state => ( { pushSubscription: store.user.get.pushSubscription( state ), } ),
};

export default map;
