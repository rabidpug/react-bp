import FacebookStrategy from 'passport-facebook';
import User from '../models/User';

const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, } = process.env;

const facebookOpts = {
  callbackURL  : '/api/auth/facebook/callback',
  clientID     : FACEBOOK_CLIENT_ID,
  clientSecret : FACEBOOK_CLIENT_SECRET,
};

const facebookStrategy =
  facebookOpts.clientID &&
  new FacebookStrategy(
    facebookOpts, (
      accessToken, refreshToken, profile, done
    ) => {
      const {
        id, name, photos,
      } = profile;

    console.log(profile); //eslint-disable-line

      User.findOne(
        { 'facebook.id': id, }, (
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
              'facebook.id'                : id,
              'profile.firstName'          : name.givenName,
              'profile.lastName'           : name.familyName,
              'profile.photos'             : photos,
              'profile.providers.facebook' : true,
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

export default facebookStrategy;
