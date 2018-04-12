import { getAuthMessage, getIsGettingAuth, } from 'Store/user/selectors';

import { authUser, } from 'Store/user/actions';

const mapUserForm = {
  Dispatch: dispatch => ( {
    onSubmit: ( values, authType ) => dispatch( authUser( {
      authType,
      values,
    } ) ),
  } ),
  State: state => ( {
    authMessage   : getAuthMessage( state ),
    isGettingAuth : getIsGettingAuth( state ),
  } ),
};

export default mapUserForm;
