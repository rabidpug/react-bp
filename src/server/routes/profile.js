import { PASSPORT_SECRET, } from 'Shared/env';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
const profile = express.Router();

profile.get( '/', passport.authenticate( 'jwt', { session: false, } ), ( req, res ) => {
  console.log('here'); //eslint-disable-line

  const { user: { profile, }, } = req;

  if ( profile ) res.json( { profile, } );
  else throw Error( 'No profile' );
} );

profile.post( '/public', passport.authenticate( 'jwt', { session: false, } ), ( req, res ) => {
  const { user, body: { key, value, }, } = req;

  user.profile.publicProfile[key] = value;

  user.save( ( e, newUser ) => {
    if ( e ) {
      res.json( {
        msg     : 'Failed to update',
        success : false,
      } );
    } else {
      const token = jwt.sign( newUser.toJSON(), PASSPORT_SECRET || 'secret' );
      const { profile, } = newUser;

      res.json( {
        profile,
        success : true,
        token   : `JWT ${token}`,
      } );
    }
  } );
} );

export default profile;
