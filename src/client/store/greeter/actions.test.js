import { SAY_HELLO, } from './types';
import { sayHello, } from './actions';

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
