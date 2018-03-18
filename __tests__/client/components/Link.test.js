import Link from 'Components/Link';
import React from 'react';
import { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';

describe(
  'Link', () => {
    it(
      'Should render the Link', () => {
        const wrapper = shallow( <Link /> );

        expect( shallowToJson( wrapper ) ).toMatchSnapshot();
      }
    );
  }
);
