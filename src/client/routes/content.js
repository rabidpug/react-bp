import {
  Home,
  Login,
  Register,
  Welcome,
} from 'Containers/Loadables';

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
  redirectPath       : '/login',
  wrapperDisplayName : 'userIsAuthenticated',
} );
const userIsNotAuthenticated = connectedReduxRedirect( {
  AuthenticatingComponent : Loading,
  authenticatedSelector   : state => !state.user.token,
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
  {
    component : userIsNotAuthenticated( Login ),
    exact     : true,
    path      : '/login',
  },
  {
    component : userIsNotAuthenticated( Register ),
    exact     : true,
    path      : '/register',
  },
];

export default content;
