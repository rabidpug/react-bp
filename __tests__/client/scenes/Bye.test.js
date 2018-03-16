import Bye from 'Scenes/Bye';
import React from 'react';
import { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';

describe(
  'TopBar', () => {
    it(
      'Should render the TopBar', () => {
        const wrapper = shallow( <Bye /> );

        expect( shallowToJson( wrapper ) ).toMatchSnapshot();
      }
    );
  }
);
