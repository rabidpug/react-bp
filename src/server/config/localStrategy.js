import { ExtractJwt, Strategy as JWTStrategy, } from 'passport-jwt';

import { PASSPORT_SECRET, } from 'Shared/env';
import User from '../models/User';

const jwtOpts = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme( 'jwt' ),
  secretOrKey    : PASSPORT_SECRET || 'secret',
};

const localStrategy = new JWTStrategy( jwtOpts, ( jwtPayload, done ) => {
  User.findOne( { _id: jwtPayload._id, }, ( e, user ) => {
    if ( e ) return done( e, false );

    if ( user ) done( null, user );
    else done( null, false );
  } );
} );

export default localStrategy;
