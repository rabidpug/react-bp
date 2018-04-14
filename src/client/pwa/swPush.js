/*eslint-disable no-undef */

self.addEventListener( 'push', event => {
  const data = event.data.json();
  const { title, } = data;

  const body = {
    body : data.body,
    icon : data.icon,
  };

  event.waitUntil( clients.matchAll( { type: 'window', } ).then( list => {
    const isFocused = list.filter( client => client.url.includes( 'welcome' ) ).reduce( ( p, n ) => p || n.focused, false );

    return isFocused || self.registration.showNotification( title, body );
  } ) );
} );
