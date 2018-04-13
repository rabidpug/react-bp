import { ExtractJwt, Strategy as JWTStrategy, } from 'passport-jwt';

import { PASSPORT_SECRET, } from 'Shared/env';
import User from '../models/User';

const jwtOpts = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme( 'jwt' ),
  secretOrKey    : PASSPORT_SECRET || 'secret',
};

const localStrategy = new JWTStrategy( jwtOpts, ( jwtPayload, done ) => {
  const expirationDate = new Date( jwtPayload.exp * 1000 );

  if ( expirationDate < new Date() ) done( null, false );

  User.findOne( { _id: jwtPayload._id, } )
    .then( user => {
      if ( !user ) throw new Error( 'No User' );

      return done( null, user );
    } )
    .catch( () => done( null, false ) );
} );

export default localStrategy;
