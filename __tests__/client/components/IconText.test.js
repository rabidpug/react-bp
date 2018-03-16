import IconText from 'Components/IconText';
import React from 'react';
import { shallow, } from 'enzyme';

describe(
  'IconText', () => {
    it(
      'Should render the IconText', () => {
        const wrapper = shallow( <IconText /> );

        expect( wrapper ).toMatchSnapshot();
      }
    );
  }
);
