import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, } from 'Shared/env';

import { OAuth2Strategy as GoogleStrategy, } from 'passport-google-oauth';
import User from '../models/User';

const googleOpts = {
  callbackURL       : '/api/auth/google/callback',
  clientID          : GOOGLE_CLIENT_ID,
  clientSecret      : GOOGLE_CLIENT_SECRET,
  passReqToCallback : true,
};

const googleStrategy =
  googleOpts.clientID &&
  new GoogleStrategy( googleOpts, (
    req, accessToken, refreshToken, profile, done
  ) => {
    process.nextTick( () => {
      const { id, name, photos, emails, } = profile;

      const displayName = `${name.givenName ? name.givenName : ''} ${name.middleName ? name.middleName : ''} ${
        name.familyName ? name.familyName : ''
      }`.replace( / {2,}/g, ' ' );
      const pics = photos.reduce( ( p, n ) => [
        n.value.replace( 'sz=50', 'sz=200' ),
        ...p,
      ], [] );
      const mail = emails.reduce( ( p, n ) => [
        n.value,
        ...p,
      ], [] );

      User.findOne( { 'google.id': id, }, ( e, user ) => {
        if ( e ) return done( e, false );

        if ( user ) done( null, user );
        else {
          const newUser = new User( {
            'google.id'                : id,
            'profile.displayNames'     : [ displayName, ],
            'profile.emails'           : mail,
            'profile.photos'           : pics,
            'profile.providers.google' : true,
          } );

          newUser.save( e => {
            if ( e ) return done( e, false );
            else done( null, newUser );
          } );
        }
      } );
    } );
  } );

export default googleStrategy;
