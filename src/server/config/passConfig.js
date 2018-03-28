import { ExtractJwt, Strategy, } from 'passport-jwt';

import User from '../models/User';
import settings from './settings';

const passConfig = passport => {
  const opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme( 'jwt' );

  opts.secretOrKey = settings.secret;

  passport.use( new Strategy(
    opts, (
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
  ) );
};

export default passConfig;
