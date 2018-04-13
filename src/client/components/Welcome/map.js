import { getGreeterMessages, } from 'Store/greeter/selectors';

const mapWelcome = { State: state => ( { messages: getGreeterMessages( state ), } ), };

export default mapWelcome;
