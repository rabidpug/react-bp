// @flow

import { getAuthMessage, getIsGettingAuth, } from 'Store/user/selectors';

import FadeWrap from '../animations/FadeWrap';
import UserPass from '../components/UserPass';
import { authUser, } from 'Store/user/actions';
import { connect, } from 'react-redux';

const mapStateToProps = state => ( {
  authMessage   : getAuthMessage( state ),
  buttonLabel   : 'Register',
  isGettingAuth : getIsGettingAuth( state ),
} );

const mapDispatchToProps = dispatch => ( { onSubmit ( payload ) {
  dispatch( authUser(
    'register', payload
  ) );
}, } );

const RegisterUserPass = connect(
  mapStateToProps, mapDispatchToProps
)( FadeWrap( UserPass ) );

export default RegisterUserPass;
