import Loadable from 'react-loadable';
import Loading from 'Components/Loading';

export const TodoPage = Loadable( { loader  : () => import( /* webpackChunkName: "TodoPage" */ 'Scenes/TodoPage' ),
                                    loading : Loading, } );
export const Bye = Loadable( { loader  : () => import( /* webpackChunkName: "Bye" */ 'Scenes/Bye' ),
                               loading : Loading, } );
export const Welcome = Loadable( { loader  : () => import( /*webpackChunkName: "Welcome" */ 'Scenes/Welcome' ),
                                   loading : Loading, } );
export const Home = Loadable( { loader  : () => import( /*webpackChunkName: "Home" */ 'Scenes/Home' ),
                                loading : Loading, } );
