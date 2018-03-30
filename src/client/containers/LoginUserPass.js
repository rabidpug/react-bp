// @flow

import { getAuthMessage, getIsGettingAuth, } from 'Store/user/selectors';

import FadeWrap from '../animations/FadeWrap';
import UserPass from '../components/UserPass';
import { authUser, } from 'Store/user/actions';
import { connect, } from 'react-redux';

const mapStateToProps = state => ( {
  authMessage   : getAuthMessage( state ),
  buttonLabel   : 'Log In',
  isGettingAuth : getIsGettingAuth( state ),
} );

const mapDispatchToProps = dispatch => ( { onSubmit ( payload ) {
  dispatch( authUser(
    'login', payload
  ) );
}, } );

const LoginUserPass = connect(
  mapStateToProps, mapDispatchToProps
)( FadeWrap( UserPass ) );

export default LoginUserPass;
