import React from 'react';
import TodoTopBar from '.';
import configureStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import { uiInitialState, } from '../../store/ui';

const mockStore = configureStore();

describe(
  'HomeTopBar Container', () => {
    let store,
      wrapper;

    beforeEach( () => {
      store = mockStore( { ui: uiInitialState, } );

      store.dispatch = jest.fn();

      wrapper = shallow( <TodoTopBar store={ store } /> );
    } );

    it(
      'maps state and dispatch to props', () => {
        const expectedAction = expect.objectContaining( {
          dataSource : expect.any( Array ),
          header     : 'Your Todo Items',
          itemLayout : 'vertical',
          renderItem : expect.any( Function ),
        } );

        expect( wrapper.props() ).toEqual( expectedAction );
      }
    );
  }
);
