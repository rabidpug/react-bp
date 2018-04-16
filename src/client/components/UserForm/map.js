import store from 'Store';
const { authUser, } = store.user.set;
const mapUserForm = {
  Dispatch : { authUser, },
  State    : state => ( {
    authMessage   : store.user.get.authMessage( state ),
    isGettingAuth : store.inProgress.get.inProgress( state, [ store.inProgress.types.GETTING_AUTH, ] ),
  } ),
};

export default mapUserForm;
