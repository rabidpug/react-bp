import { getGreeterIsLoading, getGreeterMessages, } from 'Store/greeter/selectors';

import { greeterInitialState, } from 'Store/greeter';

describe( 'getGreeterIsLoading', () => {
  it( 'should get the Greeter Loading state', () => {
    const state = { greeter: greeterInitialState, };
    const expectedAction = greeterInitialState.isLoading;

    expect( getGreeterIsLoading( state ) ).toEqual( expectedAction );
  } );
} );

describe( 'getGreeterMessages', () => {
  it( 'should get the greeter message', () => {
    const state = { greeter: greeterInitialState, };
    const expectedAction = greeterInitialState.messages;

    expect( getGreeterMessages( state ) ).toEqual( expectedAction );
  } );
} );
