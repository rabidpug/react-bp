import { getGreeterButton, getGreeterMessage, } from './selectors';

import { greeterInitialState, } from '.';

describe(
  'getGreeterButton', () => {
    it(
      'should get the required fields for the Greeter Button', () => {
        const state = { greeter: greeterInitialState, };
        const expectedAction = { isDisabled : greeterInitialState.isDisabled,
                                 label      : greeterInitialState.label, };

        expect( getGreeterButton( state ) ).toEqual( expectedAction );
      }
    );
  }
);

describe(
  'getGreeterMessage', () => {
    it(
      'should get the greeter message', () => {
        const state = { greeter: greeterInitialState, };
        const expectedAction = greeterInitialState.message;

        expect( getGreeterMessage( state ) ).toEqual( expectedAction );
      }
    );
  }
);
