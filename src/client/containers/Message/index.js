// @flow

import Message from '../../components/Message';
import { connect, } from 'react-redux';
import { getGreeterMessage, } from '../../store/greeter/selectors';

const mapStateToProps = state => ( { message: getGreeterMessage( state ), } );

export default connect( mapStateToProps )( Message );
