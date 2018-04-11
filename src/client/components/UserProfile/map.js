import { changePublic, getProfile, } from 'Store/user/actions';
import { getIsGettingProfile, getProfileDetails, } from 'Store/user/selectors';
const mapUserProfile = {
  Dispatch: dispatch => ( {
    changePublicProfile : ( key, value ) => dispatch( changePublic( key, value ) ),
    doGetProfile        : () => dispatch( getProfile() ),
  } ),
  State: state => ( {
    ...getProfileDetails( state ),
    isGettingProfile: getIsGettingProfile( state ),
  } ),
};

export default mapUserProfile;
