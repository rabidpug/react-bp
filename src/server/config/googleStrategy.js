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
      req, accessToken, refreshToken, profile, done
    ) => {
      const {
        id, name, photos,
      } = profile;

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
              'google.id'                : id,
              'profile.firstName'        : name.givenName,
              'profile.lastName'         : name.familyName,
              'profile.photos'           : photos,
              'profile.providers.google' : true,
            } );

            newUser.save( e => {
              if ( e ) {
                return done(
                  e, false
                );
              } else {
                done(
                  null, newUser
                );
              }
            } );
          }
        }
      );
    }
  );

export default googleStrategy;
