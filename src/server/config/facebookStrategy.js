/*eslint-disable camelcase */
import FacebookStrategy from 'passport-facebook';
import User from '../models/User';

const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, } = process.env;

const facebookOpts = {
  callbackURL   : '/api/auth/facebook/callback',
  clientID      : FACEBOOK_CLIENT_ID,
  clientSecret  : FACEBOOK_CLIENT_SECRET,
  profileFields : [
    'id',
    'first_name',
    'last_name',
    'email',
    'photos',
  ],
};

const facebookStrategy =
  facebookOpts.clientID &&
  new FacebookStrategy(
    facebookOpts, (
      accessToken, refreshToken, profile, done
    ) => {
    console.log(profile); //eslint-disable-line

      const {
        id, first_name, last_name, photos,
      } = profile;

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
              'profile.firstName'          : first_name,
              'profile.lastName'           : last_name,
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
