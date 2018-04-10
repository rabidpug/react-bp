// @flow

import { changePublic, getProfile, } from 'Store/user/actions';
import { getIsGettingProfile, getProfileDetails, } from 'Store/user/selectors';

import FadeWrap from 'Animations/FadeWrap';
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
)( FadeWrap( ProfileCard ) );

export default UserProfile;
