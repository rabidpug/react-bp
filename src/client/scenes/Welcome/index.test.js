import React from 'react';
import Welcome from '.';
import { shallow, } from 'enzyme';

describe(
  'TopBar', () => {
    it(
      'Should render the TopBar', () => {
        const wrapper = shallow( <Welcome /> );

        expect( wrapper ).toMatchSnapshot();
      }
    );
  }
);
