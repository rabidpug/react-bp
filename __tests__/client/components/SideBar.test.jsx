import React from 'react';
import SideBar from 'Components/SideBar';
import navMenu from 'Routes/navMenu';
import { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';

describe(
  'SideBar', () => {
    const goToPath = jest.fn();
    const toggleKey = jest.fn();
    const toggleSideBar = jest.fn();
    const [ { menuItems, }, ] = navMenu;
    const item = { item: { props: { path: '/', }, }, };
    const wrapper = shallow( <SideBar
      currentPath='/'
      goToPath={ goToPath }
      isSidebarCollapsed={ false }
      menuItems={ menuItems }
      openKeys={ [] }
      toggleKey={ toggleKey }
      toggleSideBar={ toggleSideBar }
    /> );

    it(
      'Should render the SideBar with a menu', () => {
        expect( shallowToJson( wrapper ) ).toMatchSnapshot();
      }
    );

    it(
      'should call goToPath with items path when menu clicked', () => {
        wrapper.find( 'Menu' ).simulate(
          'click', item
        );

        expect( goToPath ).toBeCalledWith( '/' );
      }
    );

    it(
      'should toggle submenu expansion when submenu item clicked', () => {
        wrapper
          .find( 'SubMenu' )
          .props()
          .onTitleClick( { key: 'sub1', } );

        expect( toggleKey ).toBeCalledWith( 'sub1' );
      }
    );

    it(
      'should call toggleSideBar when the mouse leaves and the sidebar is not collapsed', () => {
        wrapper.find( 'Sider' ).simulate( 'mouseleave' );

        expect( toggleSideBar ).toBeCalled();
      }
    );

    it(
      'should call toggleSideBar when the mouse enters and the sidebar is collapsed', () => {
        wrapper.setProps( { isSidebarCollapsed: true, } );

        wrapper.find( 'Sider' ).simulate( 'mouseenter' );

        expect( toggleSideBar ).toBeCalled();
      }
    );
  }
);
