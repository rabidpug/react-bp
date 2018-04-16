import { Home, UserForm, UserProfile, Welcome, } from 'Components/Loadables';

import Loading from 'Components/Loading';
import NotFound from 'Components/NotFound';
import { connectedReduxRedirect, } from 'redux-auth-wrapper/history4/redirect';
import { replace, } from 'react-router-redux';
import store from 'Store';

const userIsAuthenticated = connectedReduxRedirect( {
  AuthenticatingComponent : Loading,
  authenticatedSelector   : state => store.user.get.isAuthenticated( state ),
  authenticatingSelector  : state => store.inProgress.get.inProgress( state, store.inProgress.types.GETTING_AUTH ),
  redirectAction          : redirect => dispatch => {
    dispatch( replace( redirect ) );
  },
  redirectPath       : '/signin',
  wrapperDisplayName : 'userIsAuthenticated',
} );

const userIsNotAuthenticated = connectedReduxRedirect( {
  AuthenticatingComponent : Loading,
  authenticatedSelector   : state => !store.user.get.isAuthenticated( state ),
  authenticatingSelector  : state => store.inProgress.get.inProgress( state, store.inProgress.types.GETTING_AUTH ),
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
    component : userIsNotAuthenticated( UserForm ),
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
