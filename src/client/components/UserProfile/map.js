import { changePassword, changePasswordClear, changePublic, getProfile, } from 'Store/user/actions';
import {
  getChangePasswordStatus,
  getIsChangingPassword,
  getIsChangingPublic,
  getIsGettingProfile,
  getProfileDetails,
} from 'Store/user/selectors';
const mapUserProfile = {
  Dispatch: dispatch => ( {
    changePasswordClear : () => dispatch( changePasswordClear() ),
    changePublicProfile : ( key, value ) => dispatch( changePublic( {
      key,
      value,
    } ) ),
    doGetProfile : () => dispatch( getProfile() ),
    onSubmit     : ( values, type ) =>
      dispatch( changePassword( {
        type,
        values,
      } ) ),
  } ),
  State: state => ( {
    ...getProfileDetails( state ),
    changePasswordStatus : getChangePasswordStatus( state ),
    changingPassword     : getIsChangingPassword( state ),
    isChangingPublic     : getIsChangingPublic( state ),
    isGettingProfile     : getIsGettingProfile( state ),
  } ),
};

export default mapUserProfile;
