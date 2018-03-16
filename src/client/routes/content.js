import {
  Bye,
  Home,
  TodoPage,
  Welcome,
} from 'Containers/Loadables';

const content = [
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

export default content;
