import User from '../models/User';
import express from 'express';
import jwt from 'jsonwebtoken';
import settings from '../config/settings';
const auth = express.Router();

auth.post(
  '/register', (
    req, res
  ) => {
    if ( !req.body.username || !req.body.password ) {
      res.json( { msg     : 'Username and password required',
                  success : false, } );
    } else {
      const newUser = new User( { password : req.body.password,
                                  username : req.body.username, } );

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
      { username: req.body.username, }, (
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

export default auth;
