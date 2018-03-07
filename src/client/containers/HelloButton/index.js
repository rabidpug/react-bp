// @flow

import SimpleButton from '../../components/SimpleButton';
import { connect, } from 'react-redux';
import { sayHello, } from '../../store/greeter/creators';

const mapStateToProps = state => ( { isDisabled : state.greeter.isDisabled,
                                     label      : state.greeter.label, } );

const mapDispatchToProps = dispatch => ( { handleClick () {
  dispatch( sayHello( 'Hello there!' ) );
}, } );

export default connect(
  mapStateToProps, mapDispatchToProps
)( SimpleButton );
