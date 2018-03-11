import { SAY_HELLO, sayHello, } from './actions';
import { greeter, greeterInitialState, } from '.';

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
