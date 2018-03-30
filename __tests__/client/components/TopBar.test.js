import React from 'react';
import TopBar from 'Components/TopBar';
import actionMenu from 'Routes/actionMenu';
import { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';

describe(
  'TopBar', () => {
    const [ { actionMenuItems, }, ] = actionMenu.filter( menu => menu.path === '*' );
    const wrapper = shallow( <TopBar actionMenuItems={ actionMenuItems } /> );

    it(
      'Should render the TopBar', () => {
        expect( shallowToJson( wrapper ) ).toMatchSnapshot();
      }
    );

    it(
      'Should perform the action of the menu item clicked', () => {
        const action = jest.fn();

        wrapper.find( 'Menu' ).simulate(
          'click', { item: { props: { action, }, }, }
        );

        expect( action ).toBeCalled();
      }
    );
  }
);
