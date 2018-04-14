import { MONGODB_URI, NODE_ENV, } from 'Shared/env';

/*eslint-disable no-console */
import authApi from './routes/authApi';
import bodyParser from 'body-parser';
import clientRoutes from './routes/clientRoutes';
import compression from 'compression';
import express from 'express';
import helloApi from './routes/helloApi';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from './config/passport';
import profileApi from './routes/profileApi';
import pushApi from './routes/pushApi';
import winston from './config/winston';

mongoose.Promise = Promise;

mongoose
  .connect( MONGODB_URI, { promiseLibrary: Promise, } )
  .then( () => console.log( 'database connection successful' ) )
  .catch( e => console.log( e ) );

const app = express(),
  isDev = NODE_ENV === 'development';

app.enable( 'trust proxy' );

app.use( compression() );

app.use( passport.initialize() );

app.use( morgan( 'combined', { stream: winston.stream, } ) );

app.use( bodyParser.json() );

app.use( bodyParser.urlencoded( { extended: 'false', } ) );

authApi( app );

profileApi( app );

helloApi( app );

pushApi( app );

if ( !isDev ) clientRoutes( app );

export default app;
