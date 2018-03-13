import { greeter, greeterInitialState, } from '.';
import {
  sayHelloFailure,
  sayHelloRequest,
  sayHelloSuccess,
} from './actions';

describe(
  'greeter', () => {
    it(
      'should handle a hello request', () => {
        const expectedAction = {
          isDisabled : true,
          label      : 'Loading...',
          message    : 'Loading...',
        };

        expect( greeter(
          greeterInitialState, sayHelloRequest()
        ) ).toEqual( expectedAction );
      }
    );

    it(
      'should handle a hello failure', () => {
        const expectedAction = {
          isDisabled : false,
          label      : 'Try saying hi again!',
          message    : 'No message received, please check your connection and try again',
        };

        expect( greeter(
          greeterInitialState, sayHelloFailure()
        ) ).toEqual( expectedAction );
      }
    );

    it(
      'should handle a hello success', () => {
        const message = 'Hai :3';
        const expectedAction = {
          isDisabled : false,
          label      : 'Say it again!',
          message,
        };

        expect( greeter(
          greeterInitialState, sayHelloSuccess( message )
        ) ).toEqual( expectedAction );
      }
    );
  }
);
