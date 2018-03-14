import App from '.';
import React from 'react';
import { shallow, } from 'enzyme';

describe(
  'TopBar', () => {
    it(
      'Should render the TopBar', () => {
        const wrapper = shallow( <App /> );

        expect( wrapper ).toMatchSnapshot();
      }
    );
  }
);
