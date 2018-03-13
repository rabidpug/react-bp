// @flow

import { Button, } from 'antd';
import { connect, } from 'react-redux';
import { getGreeterButton, } from '../../store/greeter/selectors';
import { sayHello, } from '../../store/greeter/actions';

const mapStateToProps = state => ( { ...getGreeterButton( state ),
                                     type: 'primary', } );

const mapDispatchToProps = dispatch => ( { onClick () {
  dispatch( sayHello( Math.random() ) );
}, } );

const HelloButton = connect(
  mapStateToProps, mapDispatchToProps
)( Button );

export default HelloButton;
