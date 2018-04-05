import Message from '.';
import { connect, } from 'react-redux';
import { getGreeterMessage, } from 'Store/greeter/selectors';
const mapStateToProps = state => ( { message: getGreeterMessage( state ), } );
const HelloMessage = connect( mapStateToProps )( Message );

export default HelloMessage;
