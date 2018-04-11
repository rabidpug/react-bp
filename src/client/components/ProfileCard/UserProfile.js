// @flow

import { changePublic, getProfile, } from 'Store/user/actions';
import { getIsGettingProfile, getProfileDetails, } from 'Store/user/selectors';

import ProfileCard from 'Components/ProfileCard';
import { connect, } from 'react-redux';

const mapStateToProps = state => ( { ...getProfileDetails( state ),
                                     isGettingProfile: getIsGettingProfile( state ), } );
const mapDispatchToProps = dispatch => ( { changePublicProfile: (
  key, value
) => dispatch( changePublic(
  key, value
) ),
                                           doGetProfile: () => dispatch( getProfile() ), } );
const UserProfile = connect(
  mapStateToProps, mapDispatchToProps
)( ProfileCard );

export default UserProfile;
