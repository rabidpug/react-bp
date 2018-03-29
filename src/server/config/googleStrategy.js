import { OAuth2Strategy as GoogleStrategy, } from 'passport-google-oauth';
import User from '../models/User';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, } = process.env;

const googleOpts = {
  callbackURL  : '/api/auth/google/callback',
  clientID     : GOOGLE_CLIENT_ID,
  clientSecret : GOOGLE_CLIENT_SECRET,
};

const googleStrategy =
  googleOpts.clientID &&
  new GoogleStrategy(
    googleOpts, (
      request, accessToken, refreshToken, profile, done
    ) => {
      const {
        id, name, photos,
      } = profile;

      // See if this user already exists
      User.findOne(
        { 'google.id': id, }, (
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
            const newUser = new User( {
              firstName   : name.givenName,
              'google.id' : id,
              lastName    : name.familyName,
              photos,
            } );

            newUser.save( e => {
              if ( e ) {
                return done(
                  e, false
                );
              } else {
                done(
                  null, user
                );
              }
            } );
          }
        }
      );
    }
  );

export default googleStrategy;
