// @flow

import { getAuthMessage, getIsGettingAuth, } from 'Store/user/selectors';

import UserPass from '.';
import { authUser, } from 'Store/user/actions';
import { connect, } from 'react-redux';

const mapStateToProps = state => ( { authMessage   : getAuthMessage( state ),
                                     isGettingAuth : getIsGettingAuth( state ), } );

const mapDispatchToProps = dispatch => ( { onSubmit: (
  values, authType
) => dispatch( authUser(
  authType, values
) ), } );

const LoginUserPass = connect(
  mapStateToProps, mapDispatchToProps
)( UserPass );

export default LoginUserPass;
