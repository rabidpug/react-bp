// @flow

import { SAY_HELLO, sayHelloAction, } from './actions';

import { createReducer, } from '@acemarke/redux-starter-kit';

const greeterInitialState = {
  isDisabled : false,
  label      : 'Say hi!',
  message    : 'Do you want to say hi?',
};

const greeter = createReducer(
  greeterInitialState, { [SAY_HELLO]: sayHelloAction, }
);

export default greeter;
