import ListItem from 'Components/ListItem';
import React from 'react';
import { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';

describe(
  'ListItem', () => {
    it(
      'Should render the ListItem', () => {
        const wrapper = shallow( <ListItem /> );

        expect( shallowToJson( wrapper ) ).toMatchSnapshot();
      }
    );
  }
);
