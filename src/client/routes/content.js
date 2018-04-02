import {
  Home,
  Login,
  UserProfile,
  Welcome,
} from 'Scenes/Loadables';

import Loading from 'Components/Loading';
import NotFound from 'Scenes/NotFound';
import { connectedReduxRedirect, } from 'redux-auth-wrapper/history4/redirect';
import { replace, } from 'react-router-redux';

const userIsAuthenticated = connectedReduxRedirect( {
  AuthenticatingComponent : Loading,
  authenticatedSelector   : state => !!state.user.token,
  authenticatingSelector  : state => state.isAuthenticating,
  redirectAction          : redirect => dispatch => {
    dispatch( replace( redirect ) );
  },
  redirectPath       : '/signin',
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
    path      : '/signin',
  },
  {
    component : userIsAuthenticated( UserProfile ),
    exact     : true,
    path      : '/profile',
  },
  {
    component : NotFound,
    exact     : false,
    path      : '*',
  },
];

export default content;
