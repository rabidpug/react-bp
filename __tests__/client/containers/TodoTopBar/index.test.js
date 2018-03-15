import React from 'react';
import { TOGGLE_SIDEBAR, } from '../../../../src/client/store/ui/types';
import TodoTopBar from '../../../../src/client/containers/TodoTopBar';
import actionMenu from '../../../../src/client/routes/actionMenu';
import configureStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import { uiInitialState, } from '../../../../src/client/store/ui';

const mockStore = configureStore();

describe(
  'TodoTopBar Container', () => {
    let store,
      wrapper;
    const ownProps = { route: actionMenu[0], };

    beforeEach( () => {
      store = mockStore( { ui: uiInitialState, } );

      store.dispatch = jest.fn();

      wrapper = shallow( <TodoTopBar
        store={ store }
        { ...ownProps } /> );
    } );

    it(
      'maps state and dispatch to props', () => {
        const expectedAction = expect.objectContaining( { actionMenuItems : ownProps.route.actionMenuItems,
                                                          toggleSideBar   : expect.any( Function ), } );

        expect( wrapper.props() ).toEqual( expectedAction );
      }
    );

    describe(
      'toggleSideBar', () => {
        it(
          'maps TOGGLE_SIDEBAR to dispatch action', () => {
            const expectedAction = { type: TOGGLE_SIDEBAR, };

            wrapper.props().toggleSideBar();

            expect( store.dispatch ).toHaveBeenCalledWith( expectedAction );
          }
        );
      }
    );
  }
);
