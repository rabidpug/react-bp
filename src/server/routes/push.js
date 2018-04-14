import { PASSPORT_SECRET, } from 'Shared/env';
import { Router, } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const push = Router();

push.post( '/register', ( req, res ) => {
  const { subscription, token, } = req.body;

  const user = jwt.decode( token.replace( 'JWT ', '' ), PASSPORT_SECRET, { complete: true, } );

  User.findOne( { _id: user._id, } )
    .then( foundUser => {
      if ( !foundUser ) throw new Error( 'User not found' );

      foundUser.profile.pushSubscription = subscription;

      return foundUser.save();
    } )
    .then( () => res.sendStatus( 201 ) )
    .catch( e => res.status( 401 ).send( { msg: e.message, } ) );
} );

push.delete( '/unregister', ( req, res ) => {
  const { token, } = req.body;

  const user = jwt.decode( token.replace( 'JWT ', '' ), PASSPORT_SECRET, { complete: true, } );

  User.findOne( { _id: user._id, } )
    .then( foundUser => {
      if ( !foundUser ) throw new Error( 'User not found' );

      foundUser.profile.pushSubscription = null;

      return foundUser.save();
    } )
    .then( () => res.sendStatus( 200 ) )
    .catch( e => res.status( 401 ).send( { msg: e.message, } ) );
} );

export default push;
