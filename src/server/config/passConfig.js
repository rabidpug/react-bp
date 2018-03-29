import { ExtractJwt, Strategy as JWTStrategy, } from 'passport-jwt';

import { OAuth2Strategy as GoogleStrategy, } from 'passport-google-oauth';
import User from '../models/User';
import settings from './settings';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, } = process.env;
const passConfig = passport => {
  const jwtOpts = { jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme( 'jwt' ),
                    secretOrKey    : settings.secret, };
  const googleOpts = {
    callbackURL  : 'http://www.example.com/auth/google/callback',
    clientID     : GOOGLE_CLIENT_ID,
    clientSecret : GOOGLE_CLIENT_SECRET,
  };

  passport.use( new JWTStrategy(
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
  ) );

  googleOpts.clientID &&
    passport.use( new GoogleStrategy(
      googleOpts, (
        request, accessToken, refreshToken, profile, done
      ) => {
      // See if this user already exists
        let user = User.getUserByExternalId(
          'google', profile.id
        );

        if ( !user ) {
        // They don't, so register them
          user = User.createUser(
            profile.displayName, 'google', profile.id
          );
        }
        return done(
          null, user
        );
      }
    ) );
};

export const getToken = headers => {
  if ( headers && headers.authorization ) {
    const parted = headers.authorization.split( ' ' );

    if ( parted.length === 2 ) return parted[1];
    else return null;
  } else return null;
};

export default passConfig;
