import { greeter, greeterInitialState, } from 'Store/greeter';
import { sayHelloFailure, sayHelloRequest, sayHelloSuccess, } from 'Store/greeter/actions';

describe( 'greeter', () => {
  it( 'should handle a hello request', () => {
    const expectedAction = {
      isLoading : true,
      messages  : [],
    };

    expect( greeter( greeterInitialState, sayHelloRequest() ) ).toEqual( expectedAction );
  } );

  it( 'should handle a hello failure', () => {
    const expectedAction = {
      isLoading : false,
      messages  : [ 'An error has occurred!', ],
    };

    expect( greeter( greeterInitialState, sayHelloFailure() ) ).toEqual( expectedAction );
  } );

  it( 'should handle a hello success', () => {
    const message = 'Hai :3';
    const expectedAction = {
      isLoading : false,
      messages  : [ message, ],
    };

    expect( greeter( greeterInitialState, sayHelloSuccess( message ) ) ).toEqual( expectedAction );
  } );
} );
