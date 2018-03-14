import React from 'react';
import TopBar from '../../../../src/client/components/TopBar';
import actionMenu from '../../../../src/client/routes/actionMenu';
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
