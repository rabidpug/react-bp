import {
  Bye,
  Home,
  TodoPage,
  Welcome,
} from '../Loadables';

const routes = [
  {
    component : Home,
    exact     : true,
    path      : '/',
  },
  {
    component : Welcome,
    exact     : true,
    path      : '/welcome',
  },
  {
    component : Bye,
    exact     : true,
    path      : '/bye',
  },
  {
    component : TodoPage,
    exact     : true,
    path      : '/todo',
  },
];

export default routes;
