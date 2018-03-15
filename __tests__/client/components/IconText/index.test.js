import IconText from '../../../../src/client/components/IconText';
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
