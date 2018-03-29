import User from '../models/User';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from '../config/passport';
import settings from '../config/settings';
const auth = express.Router();

auth.post(
  '/register', (
    req, res
  ) => {
    const { username, password, } = req.body;

    if ( !username || !password ) {
      res.json( { msg     : 'Username and password required',
                  success : false, } );
    } else {
      const newUser = new User( { 'local.password' : password,
                                  'local.username' : username, } );

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
                  user.toJSON(), settings.secret
                );

                res.json( { success : true,
                            token   : `JWT ${token}`, } );
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
    'google', { scope   : [ 'profile', ],
                session : false, }
  )
);

auth.get(
  '/google/callback',
  passport.authenticate(
    'google', { failureRedirect : '/login',
                session         : false, }
  ),
  (
    req, res
  ) => {
    const token = jwt.sign(
      req.user.toJSON(), settings.secret
    );
    const htmlRedirector = `
    <html>
      <script>
        window.localStorage.setItem('JWT', 'JWT ${token}');
        window.location.href = '/';
      </script>
    </html>`;

    res.send( htmlRedirector );
  }
);

export default auth;
