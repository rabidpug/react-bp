import React from 'react';
import TodoPage from 'Scenes/TodoPage';
import { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';

describe(
  'TopBar', () => {
    it(
      'Should render the TopBar', () => {
        const wrapper = shallow( <TodoPage /> );

        expect( shallowToJson( wrapper ) ).toMatchSnapshot();
      }
    );
  }
);
