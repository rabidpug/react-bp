import clientRoutes from './clientRoutes';
import dev from './dev';
import express from 'express';
import helloApi from './helloApi';
const { NODE_ENV, } = process.env;
const app = express(),
  isDev = NODE_ENV === 'development';

helloApi( app );

if ( isDev ) dev( app );
else clientRoutes( app );

export default app;
