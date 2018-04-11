import { getGreeterMessage, } from 'Store/greeter/selectors';

const mapWelcome = { State: state => ( { message: getGreeterMessage( state ), } ), };

export default mapWelcome;
