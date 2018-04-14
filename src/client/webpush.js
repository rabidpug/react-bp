import axios from 'axios';
/*eslint-disable compat/compat */
import { pushEndpointRoute, } from 'Shared/routes';

const vapidPublicKey = 'BDdRNHkhF-kU77DIoSBFy6zLSekAoTGlA-pZQYlCq78Y-wsWu78gVZRDllsMhBHh5ELC6TsRqwQ_2FnE-vfVzN8';

function urlBase64ToUint8Array ( base64String ) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4); //eslint-disable-line
  const base64 = ( base64String + padding ).replace( /-/g, '+' ).replace( /_/g, '/' );

  const rawData = window.atob( base64 );
  const outputArray = new Uint8Array( rawData.length );

  for ( let i = 0; i < rawData.length; ++i ) outputArray[i] = rawData.charCodeAt( i );

  return outputArray;
}

const convertedVapidKey = urlBase64ToUint8Array( vapidPublicKey );

export const subscribePush = async () => {
  console.log('called'); //eslint-disable-line

  if ( process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator ) {
    try {
      const registration = await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe( {
        applicationServerKey : convertedVapidKey,
        userVisibleOnly      : true,
      } );

      const token = localStorage.getItem( 'JWT' ) || sessionStorage.getItem( 'JWT' );

      axios.post( pushEndpointRoute( 'register' ), {
        subscription,
        token,
      } );
    } catch ( e ) {
      return null;
    }
  } else return null;
};

export const unsubscribePush = async () => {
  if ( process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator ) {
    const registration = await navigator.serviceWorker.ready;
    const subscription = registration.pushManager;

    if ( !subscription ) return null;
    const token = localStorage.getItem( 'JWT' ) || sessionStorage.getItem( 'JWT' );

    await subscription.unsubscribe();

    axios.post( pushEndpointRoute( 'unregister' ), { token, } );
  } else return null;
};
