import User from '../models/User';
import { helloEndpointRoute, } from 'Shared/routes';
import passport from 'passport';
const helloApi = app => {
  app.get( helloEndpointRoute(), passport.authenticate( 'jwt', { session: false, } ), ( req, res ) => {
    const { user, } = req;

    if ( !user ) res.status( 401 ).send( { msg: 'Unauthorized.', } );

    User.findOne( { _id: user._id, } )
      .then( foundUser => {
        if ( !foundUser ) throw new Error( 'Unauthorized' );

        res.json( { message: `Hello from the server, ${user.profile.publicProfile.displayNames}! (received ${req.params.num})`, } );
      } )
      .catch( e => res.status( 401 ).send( { msg: e.message, } ) );
  } );
};

export default helloApi;
