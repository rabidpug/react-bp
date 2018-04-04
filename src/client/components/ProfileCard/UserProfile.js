// @flow

import FadeWrap from 'Animations/FadeWrap';
import ProfileCard from 'Components/ProfileCard';
import { changePublic, } from 'Store/user/actions';
import { connect, } from 'react-redux';
import { getProfile, } from 'Store/user/selectors';

const mapStateToProps = state => ( { ...getProfile( state ), } );
const mapDispatchToProps = dispatch => ( { changePublicProfile: (
  key, value
) => dispatch( changePublic(
  key, value
) ), } );
const UserProfile = connect(
  mapStateToProps, mapDispatchToProps
)( FadeWrap( ProfileCard ) );

export default UserProfile;
