import React from 'react';
import Welcome from '../../../../src/client/scenes/Welcome';
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
