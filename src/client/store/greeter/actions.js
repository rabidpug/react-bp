import { IO_CLIENT_HELLO, } from 'Shared/socket';
import { socket, } from '../../socket';
import store from 'Store';
export const sayHello = values => dispatch => {
  dispatch( store.inProgress.set.toggleInProgress( store.inProgress.types.GETTING_AUTH ) );

  const token = localStorage.getItem( 'JWT' ) || sessionStorage.getItem( 'JWT' );

  socket.emit( IO_CLIENT_HELLO, {
    token,
    values,
  } );
};
