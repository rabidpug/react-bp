import authApi from './routes/authApi';
import bluebird from 'bluebird';
import bodyParser from 'body-parser';
import clientRoutes from './routes/clientRoutes';
import compression from 'compression';
import dev from './routes/dev';
import express from 'express';
import helloApi from './routes/helloApi';
import logger from 'morgan';
import mongoose from 'mongoose';
import passport from './config/passport';

mongoose.Promise = bluebird;

const { NODE_ENV, MONGODB_URI, } = process.env;

mongoose
  .connect(
    MONGODB_URI, { promiseLibrary: bluebird, }
  )
  .then( () => console.log( 'database connection successful' ) ) //eslint-disable-line no-console
  .catch( e => console.log( e ) ); //eslint-disable-line no-console

const app = express(),
  isDev = NODE_ENV === 'development';

app.use( compression() );

app.use( passport.initialize() );

app.use( logger( 'dev' ) );

app.use( bodyParser.json() );

app.use( bodyParser.urlencoded( { extended: 'false', } ) );

authApi( app );

helloApi( app );

if ( isDev ) dev( app );
else clientRoutes( app );

export default app;
