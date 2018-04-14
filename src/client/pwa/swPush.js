/*eslint-disable no-undef */

self.addEventListener( 'push', event => {
  const data = event.data.json();
  const { title, } = data;

  const body = {
    body : data.body,
    icon : data.icon,
  };

  clients.matchAll( { type: 'window', } ).then( list => {
    const isFocused = list.filter( client => client.url === '/welcome' ).reduce( ( p, n ) => p || n.focused, false );

    !isFocused && event.waitUntil( self.registration.showNotification( title, body ) );
  } );
} );
