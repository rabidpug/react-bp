// @flow

import SimpleButton from '../../components/SimpleButton';
import { connect, } from 'react-redux';
import { getGreeterButton, } from '../../store/greeter/selectors';
import { sayHello, } from '../../store/greeter/actions';

const mapStateToProps = state => ( { ...getGreeterButton( state ), } );

const mapDispatchToProps = dispatch => ( { handleClick () {
  dispatch( sayHello( Math.random() ) );
}, } );

export default connect(
  mapStateToProps, mapDispatchToProps
)( SimpleButton );
