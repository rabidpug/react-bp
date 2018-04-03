// @flow

import { getJWTToken, getProfile, } from 'Store/user/selectors';

import FadeWrap from 'Animations/FadeWrap';
import ProfileCard from 'Components/ProfileCard';
import { connect, } from 'react-redux';

const mapStateToProps = state => ( { ...getProfile( state ),
                                     token: getJWTToken( state ), } );

const UserProfile = connect( mapStateToProps )( FadeWrap( ProfileCard ) );

export default UserProfile;
