// @flow
export const helloEndpointRoute = ( num: ?number ) => `/api/message/${num || ':num'}`;
export const authEndpointRoute = ( route: ?string ) => `/api/auth/${route || ''}`;
export const profileEndpointRoute = ( route: ?string ) => `/api/profile/${route || ''}`;
export const pushEndpointRoute = ( route: ?string ) => `/api/push/${route || ''}`;
