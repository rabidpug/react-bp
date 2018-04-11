import React from 'react';
import Welcome from 'Scenes/Welcome';
import configureStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';

const mockStore = configureStore();

describe(
  'TopBar', () => {
    const store = mockStore( {} );

    store.dispatch = jest.fn();

    it(
      'Should render the Welcome page', () => {
        const wrapper = shallow( <Welcome store={ store } /> );

        expect( shallowToJson( wrapper ) ).toMatchSnapshot();
      }
    );
  }
);
