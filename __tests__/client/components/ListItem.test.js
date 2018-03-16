import ListItem from 'Components/ListItem';
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
