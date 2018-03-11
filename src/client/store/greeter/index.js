// @flow

import { SAY_HELLO, } from './types';
import { createReducer, } from '@acemarke/redux-starter-kit';
import { sayHelloReducer, } from './reducers';

export const greeterInitialState = {
  isDisabled : false,
  label      : 'Say hi!',
  message    : 'Do you want to say hi?',
};

export const greeter = createReducer(
  greeterInitialState, { [SAY_HELLO]: sayHelloReducer, }
);
