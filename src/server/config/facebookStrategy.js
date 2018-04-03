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
    'picture.type(large)',
  ],
};

const facebookStrategy =
  facebookOpts.clientID &&
  new FacebookStrategy(
    facebookOpts, (
      accessToken, refreshToken, profile, done
    ) => {
      const {
        id, name, photos, emails,
      } = profile;
      const displayName = `${name.givenName ? name.givenName : ''} ${name.middleName ? name.middleName : ''} ${
        name.familyName ? name.familyName : ''
      }`.replace(
        / {2,}/g, ' '
      );
      const pics = photos.reduce(
        (
          p, n
        ) => [
          n.value,
          ...p,
        ], []
      );
      const mail = emails.reduce(
        (
          p, n
        ) => [
          n.value,
          ...p,
        ], []
      );

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
              'profile.displayNames'       : [ displayName, ],
              'profile.emails'             : mail,
              'profile.photos'             : pics,
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
