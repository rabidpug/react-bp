import simpleNotification from 'Components/simpleNotification';
/* eslint-disable compat/compat */
/* eslint-disable no-console */
export default function register () {
  if ( process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator ) {
    window.addEventListener(
      'load', () => {
        const swUrl = 'service-worker.js';

        navigator.serviceWorker
          .register( swUrl )
          .then( registration => {
            window.ononline = () => registration.update();

            registration.onupdatefound = () => {
              const installingWorker = registration.installing;

              installingWorker.onstatechange = () => {
                if ( installingWorker.state === 'installed' ) {
                  if ( navigator.serviceWorker.controller ) {
                    simpleNotification(
                      'Update Available',
                      'There is an update available! Click below to update now.',
                      'Update Now'
                    );
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
