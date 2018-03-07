// @flow

import { SAY_HELLO, } from './types';
import { createReducer, } from '@acemarke/redux-starter-kit';
import { greeterInitialState, } from './initialState';
import { sayHelloAction, } from './actions';

const greeter = createReducer(
  greeterInitialState, { [SAY_HELLO]: sayHelloAction, }
);

export default greeter;
