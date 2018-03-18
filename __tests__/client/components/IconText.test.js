import IconText from 'Components/IconText';
import React from 'react';
import { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';

describe(
  'IconText', () => {
    it(
      'Should render the IconText', () => {
        const wrapper = shallow( <IconText /> );

        expect( shallowToJson( wrapper ) ).toMatchSnapshot();
      }
    );
  }
);
