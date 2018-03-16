import Link from 'Components/Link';
import React from 'react';
import { shallow, } from 'enzyme';

describe(
  'Link', () => {
    it(
      'Should render the Link', () => {
        const wrapper = shallow( <Link /> );

        expect( wrapper ).toMatchSnapshot();
      }
    );
  }
);
