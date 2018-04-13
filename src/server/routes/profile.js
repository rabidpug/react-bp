import express from 'express';
import passport from 'passport';
const profile = express.Router();

profile.get( '/', passport.authenticate( 'jwt', { session: false, } ), ( req, res ) => {
  const { user: { profile, }, } = req;

  if ( profile ) res.json( { profile, } );
  else throw Error( 'No profile' );
} );

profile.post( '/public', passport.authenticate( 'jwt', { session: false, } ), ( req, res ) => {
  const { user, body: { key, value, }, } = req;

  user.profile.publicProfile[key] = value;

  const { profile, } = user;

  user
    .save()
    .then( () => res.json( { profile, } ) )
    .catch( e => res.status( 401 ).send( { msg: e.message, } ) );
} );

export default profile;

'';
