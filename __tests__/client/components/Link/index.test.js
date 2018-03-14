import Link from '../../../../src/client/components/Link';
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
