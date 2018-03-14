import Bye from '../../../../src/client/scenes/Bye';
import React from 'react';
import { shallow, } from 'enzyme';

describe(
  'TopBar', () => {
    it(
      'Should render the TopBar', () => {
        const wrapper = shallow( <Bye /> );

        expect( wrapper ).toMatchSnapshot();
      }
    );
  }
);
