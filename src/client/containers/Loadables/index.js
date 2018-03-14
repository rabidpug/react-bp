import Loadable from 'react-loadable';
import Loading from '../../components/Loading';

export const TodoPage = Loadable( { loader  : () => import( /* webpackChunkName: "TodoPage" */ '../../scenes/TodoPage' ),
                                    loading : Loading, } );
export const Bye = Loadable( { loader  : () => import( /* webpackChunkName: "Bye" */ '../../scenes/Bye' ),
                               loading : Loading, } );
export const Welcome = Loadable( { loader  : () => import( /*webpackChunkName: "Welcome" */ '../../scenes/Welcome' ),
                                   loading : Loading, } );
export const Home = Loadable( { loader  : () => import( /*webpackChunkName: "Home" */ '../../scenes/Home' ),
                                loading : Loading, } );
