// @flow

import FadeWrap from 'Animations/FadeWrap';
import ProfileCard from 'Components/ProfileCard';
import { connect, } from 'react-redux';
import { getProfile, } from 'Store/user/selectors';

const mapStateToProps = state => ( { ...getProfile( state ), } );

const UserProfile = connect( mapStateToProps )( FadeWrap( ProfileCard ) );

export default UserProfile;
