// @flow
export const helloEndpointRoute = ( num: ?number ) => `/api/message/${num || ':num'}`;
export const authEndpointRoute = ( route: ?string ) => `/api/auth/${route || ''}`;
