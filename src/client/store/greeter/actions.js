//@flow

import { SAY_HELLO, } from './types';
import { createAction, } from 'redux-actions';

export const sayHello: Function = createAction( SAY_HELLO );
