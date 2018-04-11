import Loadable from 'react-loadable';
import Loading from 'Components/Loading';

export const Welcome = Loadable( {
  loader  : () => import( /*webpackChunkName: "Welcome" */ 'Components/Welcome' ),
  loading : Loading,
  timeout : 10000,
} );
export const Home = Loadable( {
  loader  : () => import( /*webpackChunkName: "Home" */ 'Components/Home' ),
  loading : Loading,
  timeout : 10000,
} );
export const UserForm = Loadable( {
  loader  : () => import( /*webpackChunkName: "UserForm" */ 'Components/UserForm' ),
  loading : Loading,
  timeout : 10000,
} );

export const UserProfile = Loadable( {
  loader  : () => import( /*webpackChunkName: "UserProfile" */ 'Components/UserProfile' ),
  loading : Loading,
  timeout : 10000,
} );
