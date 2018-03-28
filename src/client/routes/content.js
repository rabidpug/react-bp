import { Home, Welcome, } from 'Containers/Loadables';

import Loading from 'Components/Loading';
import { connectedReduxRedirect, } from 'redux-auth-wrapper/history4/redirect';
import { replace, } from 'react-router-redux';

const userIsAuthenticated = connectedReduxRedirect( {
  AuthenticatingComponent : Loading,
  authenticatedSelector   : state => !!state.user.token,
  authenticatingSelector  : state => state.isAuthenticating,
  redirectAction          : redirect => dispatch => {
    dispatch( replace( redirect ) );
  },
  redirectPath       : '/',
  wrapperDisplayName : 'userIsAuthenticated',
} );

const content = [
  {
    component : Home,
    exact     : true,
    path      : '/',
  },
  {
    component : userIsAuthenticated( Welcome ),
    exact     : true,
    path      : '/welcome',
  },
];

export default content;
