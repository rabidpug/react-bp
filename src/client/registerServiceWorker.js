import { toggleUpdate, } from 'Store/ui/actions';
/* eslint-disable compat/compat */
/* eslint-disable no-console */
export default function register ( store ) {
  if ( process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator ) {
    window.addEventListener(
      'load', () => {
        const swUrl = 'service-worker.js';

        navigator.serviceWorker
          .register( swUrl )
          .then( registration => {
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;

              installingWorker.onstatechange = () => {
                if ( installingWorker.state === 'installed' ) {
                  if ( navigator.serviceWorker.controller ) {
                    console.log( 'New content is available; please refresh.' );

                    store.dispatch( toggleUpdate() );
                  } else console.log( 'Content is cached for offline use.' );
                }
              };
            };
          } )
          .catch( error => {
            console.error(
              'Error during service worker registration:', error
            );
          } );
      }
    );
  }
}

export function unregister () {
  if ( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.ready.then( registration => {
      registration.unregister();
    } );
  }
}
