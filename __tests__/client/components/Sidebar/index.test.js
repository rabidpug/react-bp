import React from 'react';
import Sidebar from '../../../../src/client/components/Sidebar';
import navMenu from '../../../../src/client/routes/navMenu';
import { shallow, } from 'enzyme';

describe(
  'Sidebar', () => {
    it(
      'Should render the Sidebar', () => {
        const [ { menuItems, }, ] = navMenu;
        const wrapper = shallow( <Sidebar
          menuItems={ menuItems }
          openKeys={ [] } /> );

        expect( wrapper ).toMatchSnapshot();
      }
    );
  }
);
