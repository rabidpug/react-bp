import Message from 'Components/Message';
import React from 'react';
import { shallow, } from 'enzyme';

describe(
  'Message', () => {
    it(
      'Should render the Message', () => {
        const wrapper = shallow( <Message /> );

        expect( wrapper ).toMatchSnapshot();
      }
    );
  }
);
