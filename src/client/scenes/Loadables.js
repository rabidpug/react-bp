import Loadable from 'react-loadable';
import Loading from 'Components/Loading';

export const Welcome = Loadable( {
  loader  : () => import( /*webpackChunkName: "Welcome" */ 'Scenes/Welcome' ),
  loading : Loading,
  timeout : 10000,
} );
export const Home = Loadable( {
  loader  : () => import( /*webpackChunkName: "Home" */ 'Scenes/Home' ),
  loading : Loading,
  timeout : 10000,
} );
export const Login = Loadable( {
  loader  : () => import( /*webpackChunkName: "Login" */ 'Components/UserPass/LoginUserPass' ),
  loading : Loading,
  timeout : 10000,
} );

export const UserProfile = Loadable( {
  loader  : () => import( /*webpackChunkName: "UserProfile" */ 'Components/ProfileCard/UserProfile' ),
  loading : Loading,
  timeout : 10000,
} );
