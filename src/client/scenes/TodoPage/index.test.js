import React from 'react';
import TodoPage from '.';
import { shallow, } from 'enzyme';

describe(
  'TopBar', () => {
    it(
      'Should render the TopBar', () => {
        const wrapper = shallow( <TodoPage /> );

        expect( wrapper ).toMatchSnapshot();
      }
    );
  }
);
