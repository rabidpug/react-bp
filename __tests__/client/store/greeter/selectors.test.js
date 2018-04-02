import {
  getGreeterIsLoading,
  getGreeterLabel,
  getGreeterMessage,
} from 'Store/greeter/selectors';

import { greeterInitialState, } from 'Store/greeter';

describe(
  'getGreeterLabel', () => {
    it(
      'should get the Greeter Label', () => {
        const state = { greeter: greeterInitialState, };
        const expectedAction = greeterInitialState.label;

        expect( getGreeterLabel( state ) ).toEqual( expectedAction );
      }
    );
  }
);

describe(
  'getGreeterIsLoading', () => {
    it(
      'should get the Greeter Loading state', () => {
        const state = { greeter: greeterInitialState, };
        const expectedAction = greeterInitialState.isLoading;

        expect( getGreeterIsLoading( state ) ).toEqual( expectedAction );
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
