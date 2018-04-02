// @flow

import { getGreeterIsLoading, getGreeterLabel, } from 'Store/greeter/selectors';

import { Button, } from 'antd';
import { connect, } from 'react-redux';
import { sayHello, } from 'Store/greeter/actions';

const mapStateToProps = state => ( {
  children : getGreeterLabel( state ),
  loading  : getGreeterIsLoading( state ),
  type     : 'primary',
} );

const mapDispatchToProps = dispatch => ( { onClick: () => dispatch( sayHello( Math.random() ) ), } );

const HelloButton = connect(
  mapStateToProps, mapDispatchToProps
)( Button );

export default HelloButton;
