import { PASSPORT_SECRET, } from 'Shared/env';
import { Router, } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from '../config/passport';
const auth = Router();

const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
const userReg = /^([0-9]|[a-z]|-|_)*$/;

auth.post( '/refresh', ( req, res ) => {
  const { body: { refreshToken, }, } = req;

  User.findOne( { refreshToken, } )
    .then( user => {
      if ( !user ) throw new Error( 'User not authorized' );
      const token = jwt.sign( user.toJSON(), PASSPORT_SECRET || 'secret', { expiresIn: 300, } );

      res.json( { token: `JWT ${token}`, } );
    } )
    .catch( e => res.status( 401 ).send( { msg: e.message, } ) );
} );

auth.post( '/create', passport.authenticate( 'jwt', { session: false, } ), ( req, res ) => {
  const {
    user,
    body: { values: { username, password, }, },
  } = req;
  const hasErrors =
    !!user === false
      ? 'User not found'
      : passReg.test( password ) === false
        ? 'Password failed validation'
        : userReg.test( username ) === false
          ? 'Username failed validation'
          : false;

  hasErrors && res.status( 401 ).send( { msg: hasErrors, } );

  user.local = {
    password,
    username,
  };

  user.profile.providers.local = true;

  user
    .save()
    .then( () =>
      res.json( {
        msg     : 'Username and password successfully added to profile',
        profile : user.profile,
      } ) )
    .catch( e => res.status( 401 ).send( { msg: e.message, } ) );
} );

auth.post( '/change', passport.authenticate( 'jwt', { session: false, } ), ( req, res ) => {
  const {
    user,
    body: { values, },
  } = req;
  const hasErrors =
    !!user === false
      ? 'User not found'
      : !!values === false
        ? 'Password data not found'
        : passReg.test( values.password ) === false
          ? 'Password failed validation'
          : false;

  hasErrors && res.status( 401 ).send( { msg: hasErrors, } );

  user
    .comparePassword( values.current )
    .then( isMatch => {
      if ( isMatch === false ) throw new Error( 'The current password entered was incorrect.' );
      return user.comparePassword( values.password );
    } )
    .then( isMatch => {
      if ( isMatch ) throw new Error( 'The new password enters cannot match the current password' );

      user.local.password = values.password;

      return user.save();
    } )
    .then( () => res.send( { msg: 'Password change successful', } ) )
    .catch( e => res.status( 401 ).send( { msg: e.message, } ) );
} );

auth.post( '/register', ( req, res ) => {
  const { username, password, email, } = req.body;
  const hasErrors =
    userReg.test( username ) === false
      ? 'Username must consist of only lowercase letters, numbers, _ and -'
      : passReg.test( password ) === false
        ? 'Password must 8 or more characters containing at least one uppercase letter, one lowercase letter and one number.'
        : !!username === false
          ? 'Username is required'
          : !!password === false
            ? 'Password is required'
            : false;

  hasErrors && res.status( 401 ).send( { msg: hasErrors, } );

  const newUser = new User( {
    'local.password'          : password,
    'local.username'          : username,
    'profile.emails'          : [ email, ],
    'profile.providers.local' : true,
  } );

  newUser
    .save()
    .then( () => res.json( { msg: 'Registration successful.', } ) )
    .catch( e => res.status( 400 ).send( { msg: e.message, } ) );
} );

auth.post( '/usercheck', ( req, res ) => {
  User.findOne( { 'local.username': req.body.username, } )
    .then( user => res.json( { userExists: !!user, } ) )
    .catch( e => res.status( 400 ).send( { msg: e.message, } ) );
} );

auth.post( '/link', passport.authenticate( 'jwt', { session: false, } ), ( req, res ) => {
  const { user: originalUser, } = req;
  let mergeUser;

  try {
    mergeUser = jwt.verify( req.body.newToken.replace( 'JWT ', '' ), PASSPORT_SECRET, { complete: true, } );
  } catch ( e ) {
    res.status( 401 ).send( { msg: 'Merge User could not be verified', } );
  }

  if ( !originalUser || !mergeUser ) res.status( 401 ).send( { msg: `${originalUser ? 'Merge' : 'Original'} User could not be verified`, } );

  User.findOneAndRemove( { _id: mergeUser._id, } )
    .then( () => {
      const {
        profile: {
          displayNames: originalDisplayNames = [],
          emails: originalEmails = [],
          photos: originalPhotos = [],
          publicProfile,
        },
      } = originalUser;
      const { profile: { displayNames: mergeDisplayNames = [], emails: mergeEmails = [], photos: mergePhotos = [], }, } = mergeUser;
      const { providers = {}, } = mergeUser.profile;

      Object.keys( providers )
        .filter( key => !originalUser.profile.providers[key] && mergeUser.profile.providers[key] )
        .forEach( key => {
          originalUser[key] = mergeUser[key];

          originalUser.profile.providers[key] = true;
        } );

      originalUser.profile = {
        displayNames: [
          ...originalDisplayNames,
          ...mergeDisplayNames,
        ],
        emails: [
          ...originalEmails,
          ...mergeEmails,
        ],
        photos: [
          ...originalPhotos,
          ...mergePhotos,
        ],
        providers     : { ...originalUser.profile.providers, },
        publicProfile : { ...publicProfile, },
      };

      const refreshId = Object.keys( originalUser.profile.providers ).reduce( ( p, n ) => p ? p : originalUser[n].username || originalUser[n].id,
                                                                              false );

      const refreshToken = refreshId + bcrypt.genSaltSync( 10 );

      originalUser.refreshToken = refreshToken;

      return originalUser.save();
    } )
    .then( savedUser => {
      const token = jwt.sign( originalUser.toJSON(), PASSPORT_SECRET || 'secret', { expiresIn: 300, } );
      const { refreshToken, } = savedUser;

      res.json( {
        profile : savedUser.profile,
        refreshToken,
        token   : `JWT ${token}`,
      } );
    } )
    .catch( e => res.status( 401 ).send( { msg: e.message, } ) );
} );

auth.post( '/login', ( req, res ) => {
  User.findOne( { 'local.username': req.body.username, } )
    .then( user => {
      if ( !user ) throw new Error( `The user ${req.body.username} does not exist.` );

      return user.comparePassword( req.body.password ).then( isMatch => {
        if ( !isMatch ) throw new Error( 'The password entered was incorrect' );
        const refreshToken = user.local.username + bcrypt.genSaltSync( 10 );

        user.refreshToken = refreshToken;

        return user.save();
      } );
    } )
    .then( savedUser => {
      const token = jwt.sign( savedUser.toJSON(), PASSPORT_SECRET || 'secret', { expiresIn: 300, } );
      const { refreshToken, } = savedUser;

      res.json( {
        profile : savedUser.profile,
        refreshToken,
        token   : `JWT ${token}`,
      } );
    } )
    .catch( e => res.status( 401 ).send( { msg: e.message, } ) );
} );

auth.get( '/google',
          passport.authenticate( 'google', {
            scope: [
              'https://www.googleapis.com/auth/plus.login',
              'https://www.googleapis.com/auth/plus.profile.emails.read',
            ],
            session: false,
          } ) );

auth.get( '/google/callback',
          passport.authenticate( 'google', {
            failureRedirect : '/signin',
            session         : false,
          } ),
          ( req, res ) => {
            const { user, } = req;
            const token = jwt.sign( user.toJSON(), PASSPORT_SECRET || 'secret', { expiresIn: 300, } );
            const refreshToken = user.google.id + bcrypt.genSaltSync( 10 );

            user.refreshToken = refreshToken;

            const { profile, } = user;

            const htmlRedirector = `
<html>
  <script>
    window.localStorage.setItem('tempToken', 'JWT ${token}');
    window.localStorage.setItem('tempRefreshToken', '${refreshToken}');
    window.localStorage.setItem('profile', JSON.stringify(${JSON.stringify( profile )}));
    window.location.href = '/';
  </script>
</html>`;

            user
              .save()
              .then( () => {
                res.send( htmlRedirector );
              } )
              .catch( e => res.status( 400 ).send( { msg: e.message, } ) );
          } );

auth.get( '/facebook',
          passport.authenticate( 'facebook', {
            scope   : [ 'public_profile', ],
            session : false,
          } ) );

auth.get( '/facebook/callback',
          passport.authenticate( 'facebook', {
            failureRedirect : '/signin',
            session         : false,
          } ),
          ( req, res ) => {
            const { user, } = req;
            const token = jwt.sign( user.toJSON(), PASSPORT_SECRET || 'secret', { expiresIn: 300, } );
            const refreshToken = user.facebook.id + bcrypt.genSaltSync( 10 );

            user.refreshToken = refreshToken;

            const { profile, } = user;

            const htmlRedirector = `
<html>
  <script>
    window.localStorage.setItem('tempToken', 'JWT ${token}');
    window.localStorage.setItem('tempRefreshToken', '${refreshToken}');
    window.localStorage.setItem('profile', JSON.stringify(${JSON.stringify( profile )}));
    window.location.href = '/';
  </script>
</html>`;

            user
              .save()
              .then( () => {
                res.send( htmlRedirector );
              } )
              .catch( e => res.status( 400 ).send( { msg: e.message, } ) );
          } );

export default auth;
