import { PASSPORT_SECRET, } from 'Shared/env';
import User from '../models/User';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from '../config/passport';
const auth = express.Router();

auth.post(
  '/register', (
    req, res
  ) => {
    const { username, password, } = req.body;
    const userReg = /^([0-9]|[a-z]|-|_)*$/;
    const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    if ( !userReg.test( username ) ) {
      res.json( { msg     : 'Username must consist of only lowercase letters, numbers, _ and -',
                  success : false, } );
    } else if ( !passReg.test( password ) ) {
      res.json( { msg:
        'Password must 8 or more characters containing at least one uppercase letter, one lowercase letter and one number.',
                  success: false, } );
    } else if ( !username || !password ) {
      res.json( { msg     : 'Username and password required',
                  success : false, } );
    } else {
      const newUser = new User( {
        'local.password'          : password,
        'local.username'          : username,
        'profile.providers.local' : true,
      } );

      newUser.save( e => {
        if ( e ) {
          return res.json( { msg     : 'Username already exists.',
                             success : false, } );
        }

        res.json( { msg     : 'Registration successful.',
                    success : true, } );
      } );
    }
  }
);

auth.post(
  '/usercheck', (
    req, res
  ) =>
    User.findOne(
      { 'local.username': req.body.username, }, (
        e, user
      ) => {
        if ( e ) throw e;
        if ( user ) res.json( { userExists: true, } );
        else res.json( { userExists: false, } );
      }
    )
);

auth.post(
  '/login', (
    req, res
  ) => {
    User.findOne(
      { 'local.username': req.body.username, }, (
        e, user
      ) => {
        if ( e ) throw e;

        if ( user ) {
          user.comparePassword(
            req.body.password, (
              e, isMatch
            ) => {
              if ( isMatch && !e ) {
                const token = jwt.sign(
                  user.toJSON(), PASSPORT_SECRET || 'secret'
                );

                res.json( {
                  profile : user.profile,
                  success : true,
                  token   : `JWT ${token}`,
                } );
              } else {
                res.status( 401 ).send( { msg     : 'Incorrect password!',
                                          success : false, } );
              }
            }
          );
        } else {
          res.status( 401 ).send( { msg     : `The user ${req.body.username} does not exist.`,
                                    success : false, } );
        }
      }
    );
  }
);

auth.get(
  '/google',
  passport.authenticate(
    'google', { scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read',
    ],
                session: false, }
  )
);

auth.get(
  '/google/callback',
  passport.authenticate(
    'google', { failureRedirect : '/signin',
                session         : false, }
  ),
  (
    req, res
  ) => {
    const token = jwt.sign(
      req.user.toJSON(), PASSPORT_SECRET || 'secret'
    );
    const { profile, } = req.user;

    const htmlRedirector = `
    <html>
      <script>
        window.localStorage.setItem('JWT', 'JWT ${token}');
        window.localStorage.setItem('profile', JSON.stringify(${profile}));
        window.location.href = '/';
      </script>
    </html>`;

    res.send( htmlRedirector );
  }
);

auth.get(
  '/facebook',
  passport.authenticate(
    'facebook', { scope   : [ 'public_profile', ],
                  session : false, }
  )
);

auth.get(
  '/facebook/callback',
  passport.authenticate(
    'facebook', { failureRedirect : '/signin',
                  session         : false, }
  ),
  (
    req, res
  ) => {
    const token = jwt.sign(
      req.user.toJSON(), PASSPORT_SECRET || 'secret'
    );
    const { profile, } = req.user;

    const htmlRedirector = `
    <html>
      <script>
        window.localStorage.setItem('JWT', 'JWT ${token}');
        window.localStorage.setItem('profile', JSON.stringify(${profile}));
        window.location.href = '/';
      </script>
    </html>`;

    res.send( htmlRedirector );
  }
);

export default auth;
