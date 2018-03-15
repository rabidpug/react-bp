import ListItem from '../../../../src/client/components/ListItem';
import React from 'react';
import { shallow, } from 'enzyme';

describe(
  'ListItem', () => {
    it(
      'Should render the ListItem', () => {
        const wrapper = shallow( <ListItem /> );

        expect( wrapper ).toMatchSnapshot();
      }
    );
  }
);
