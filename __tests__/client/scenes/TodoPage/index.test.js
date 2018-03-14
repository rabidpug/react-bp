import React from 'react';
import TodoPage from '../../../../src/client/scenes/TodoPage';
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
