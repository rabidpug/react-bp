import { greeter, greeterInitialState, } from '.';

import { sayHello, } from './actions';

describe(
  'greeter', () => {
    it(
      'should handle saying hello', () => {
        const message = 'Hello!';
        const expectedAction = {
          isDisabled : true,
          label      : 'Thanks!',
          message,
        };

        expect( greeter(
          greeterInitialState, sayHello( message )
        ) ).toEqual( expectedAction );
      }
    );
  }
);
