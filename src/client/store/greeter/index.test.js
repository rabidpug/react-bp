import {
  SAY_HELLO,
  sayHello,
  sayHelloAction,
} from './actions';

import { createReducer, } from '@acemarke/redux-starter-kit';

export const greeterInitialState = {
  isDisabled : false,
  label      : 'Say hi!',
  message    : 'Do you want to say hi?',
};

export const greeter = createReducer(
  greeterInitialState, { [SAY_HELLO]: sayHelloAction, }
);

describe(
  'sayHello', () => {
    it(
      'should create an action to say hello', () => {
        const message = 'Hello!!';
        const expectedAction = { payload : message,
                                 type    : SAY_HELLO, };

        expect( sayHello( message ) ).toEqual( expectedAction );
      }
    );
  }
);
