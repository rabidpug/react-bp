import { getToken, } from '../config/helpers';
import { helloEndpointRoute, } from 'Shared/routes';
import passport from 'passport';
const helloApi = app => {
  app.get(
    helloEndpointRoute(), passport.authenticate(
      'jwt', { session: false, }
    ), (
      req, res
    ) => {
      const token = getToken( req.headers );

      if ( token ) res.json( { message: `Hello from the server! (received ${req.params.num})`, } );
      else {
        return res.status( 403 ).send( { msg     : 'Unauthorized.',
                                         success : false, } );
      }
    }
  );
};

export default helloApi;
