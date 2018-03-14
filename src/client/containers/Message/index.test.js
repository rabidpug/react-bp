import Message from '.';
import React from 'react';
import configureStore from 'redux-mock-store';
import { greeterInitialState, } from '../../store/greeter';
import { shallow, } from 'enzyme';

const mockStore = configureStore();

describe(
  'HelloButton Container', () => {
    let store,
      wrapper;

    beforeEach( () => {
      store = mockStore( { greeter: greeterInitialState, } );

      store.dispatch = jest.fn();

      wrapper = shallow( <Message store={ store } /> );
    } );

    it(
      'maps state and dispatch to props', () => {
        const expectedAction = expect.objectContaining( { message: greeterInitialState.message, } );

        expect( wrapper.props() ).toEqual( expectedAction );
      }
    );
  }
);
