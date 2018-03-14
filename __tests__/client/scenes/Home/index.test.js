import Home from '../../../../src/client/scenes/Home';
import React from 'react';
import { shallow, } from 'enzyme';

describe(
  'TopBar', () => {
    it(
      'Should render the TopBar', () => {
        const wrapper = shallow( <Home /> );

        expect( wrapper ).toMatchSnapshot();
      }
    );
  }
);
