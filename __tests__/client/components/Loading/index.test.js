import Loading from '../../../../src/client/components/Loading';
import React from 'react';
import { shallow, } from 'enzyme';

describe(
  'Loading', () => {
    it(
      'Should render the Loading', () => {
        const wrapper = shallow( <Loading /> );

        expect( wrapper ).toMatchSnapshot();
      }
    );
  }
);
