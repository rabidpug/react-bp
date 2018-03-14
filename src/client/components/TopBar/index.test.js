import React from 'react';
import TopBar from '.';
import actionMenu from '../../routes/actionMenu';
import { shallow, } from 'enzyme';

describe(
  'TopBar', () => {
    it(
      'Should render the TopBar', () => {
        const [ { actionMenuItems, }, ] = actionMenu.filter( menu => menu.path === '/todo' );
        const wrapper = shallow( <TopBar actionMenuItems={ actionMenuItems } /> );

        expect( wrapper ).toMatchSnapshot();
      }
    );
  }
);
