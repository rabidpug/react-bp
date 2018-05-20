import { sayHello, } from 'Store/greeter/actions';
import store from 'Store';

const map = {
  Dispatch : { sayHello, },
  State    : state => ( { loading: store.inProgress.get.inProgress( state, store.inProgress.types.SAY_HELLO ), } ),
};

export default map;
