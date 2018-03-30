import { MONGODB_URI, NODE_ENV, } from 'Shared/env';

/*eslint-disable no-console */
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
import path from 'path';

mongoose.Promise = bluebird;

mongoose
  .connect(
    MONGODB_URI, { promiseLibrary: bluebird, }
  )
  .then( () => console.log( 'database connection successful' ) )
  .catch( e => console.log( e ) );

const app = express(),
  isDev = NODE_ENV === 'development';

app.use( compression() );

app.use( passport.initialize() );

app.use( logger( 'dev' ) );

app.use( bodyParser.json() );

app.use( bodyParser.urlencoded( { extended: 'false', } ) );

authApi( app );

helloApi( app );

app.get(
  '*service-worker.js', (
    req, res
  ) => {
    res.set(
      'content-type', 'application/javascript'
    );

    res.send( path.resolve(
      __dirname, 'service-worker.js'
    ) );

    res.end();
  }
);

if ( isDev ) dev( app );
else clientRoutes( app );

export default app;
