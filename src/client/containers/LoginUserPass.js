// @flow

import { getAuthMessage, getIsGettingAuth, } from 'Store/user/selectors';

import FadeWrap from '../animations/FadeWrap';
import UserPass from '../components/UserPass';
import { authUser, } from 'Store/user/actions';
import { connect, } from 'react-redux';

const mapStateToProps = state => ( { authMessage   : getAuthMessage( state ),
                                     isGettingAuth : getIsGettingAuth( state ), } );

const mapDispatchToProps = dispatch => ( { onSubmit (
  values, authType
) {
  dispatch( authUser(
    authType, values
  ) );
}, } );

const LoginUserPass = connect(
  mapStateToProps, mapDispatchToProps
)( FadeWrap( UserPass ) );

export default LoginUserPass;
