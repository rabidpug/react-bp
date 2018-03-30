import { SAY_HELLO_REQUEST, } from 'Store/greeter/types';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import { sayHello, } from 'Store/greeter/actions';
import thunkMiddleware from 'redux-thunk';

const mockStore = configureMockStore( [ thunkMiddleware, ] );

afterEach( () => {
  fetchMock.restore();
} );

describe(
  'sayHello', () => {
    it(
      'Succeeds', () => {
        // fetchMock.get(
        //   helloEndpointRoute( 666 ), { message: 'Async hello success', }
        // );

        const store = mockStore( {} );

        store.dispatch( sayHello( 666 ) );

        expect( store.getActions() ).toEqual( [ { type: SAY_HELLO_REQUEST, }, ] );
      }
    );
  }
);
