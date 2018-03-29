import { ExtractJwt, Strategy as JWTStrategy, } from 'passport-jwt';

import User from '../models/User';
import settings from './settings';

const jwtOpts = { jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme( 'jwt' ),
                  secretOrKey    : settings.secret, };

const localStrategy = new JWTStrategy(
  jwtOpts, (
    jwtPayload, done
  ) => {
    User.findOne(
      { id: jwtPayload.id, }, (
        e, user
      ) => {
        if ( e ) {
          return done(
            e, false
          );
        }

        if ( user ) {
          done(
            null, user
          );
        } else {
          done(
            null, false
          );
        }
      }
    );
  }
);

export default localStrategy;
