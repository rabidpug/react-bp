import { getGreeterIsLoading, } from 'Store/greeter/selectors';

import { sayHello, } from 'Store/greeter/actions';

const mapHelloButton = {
  Dispatch : dispatch => ( { onClick: () => dispatch( sayHello( Math.random() ) ), } ),
  State    : state => ( {
    children : 'Send Message',
    loading  : getGreeterIsLoading( state ),
    type     : 'primary',
  } ),
};

export default mapHelloButton;
