// @flow

import Message from '../../components/Message';
import { connect, } from 'react-redux';

const mapStateToProps = state => ( { message: state.hello.get( 'message' ),  } );

export default connect( mapStateToProps )( Message );
