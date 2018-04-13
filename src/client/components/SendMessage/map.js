import { getGreeterIsLoading, } from 'Store/greeter/selectors';
import { sayHello, } from 'Store/greeter/actions';

const mapSendMessage = {
  Dispatch : dispatch => ( { sendMessage: value => dispatch( sayHello( value ) ), } ),
  State    : state => ( { loading: getGreeterIsLoading( state ), } ),
};

export default mapSendMessage;
