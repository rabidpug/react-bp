// @flow

import { getAuthMessage, getIsGettingAuth, } from 'Store/user/selectors';

import UserPass from '../components/UserPass';
import { authUser, } from 'Store/user/actions';
import { connect, } from 'react-redux';

const mapStateToProps = state => ( {
  authMessage   : getAuthMessage( state ),
  buttonLabel   : 'Register',
  isGettingAuth : getIsGettingAuth( state ),
} );

const mapDispatchToProps = dispatch => ( { handleSubmit ( payload ) {
  dispatch( authUser(
    'register', payload
  ) );
}, } );

const RegisterUserPass = connect(
  mapStateToProps, mapDispatchToProps
)( UserPass );

export default RegisterUserPass;
