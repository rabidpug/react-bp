import React from 'react';
import SideBar from 'Components/SideBar';
import navMenu from 'Routes/navMenu';
import { shallow, } from 'enzyme';

describe(
  'SideBar', () => {
    it(
      'Should render the SideBar', () => {
        const [ { menuItems, }, ] = navMenu;
        const wrapper = shallow( <SideBar
          currentPath='/'
          menuItems={ menuItems }
          openKeys={ [] } /> );

        expect( wrapper ).toMatchSnapshot();
      }
    );
  }
);
