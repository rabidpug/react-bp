import React from 'react';
import ShowModal from 'Containers/ShowModal';
import { TOGGLE_TODO_MODAL, } from 'Store/ui/types';
import configureStore from 'redux-mock-store';
import { greeterInitialState, } from 'Store/greeter';
import { shallow, } from 'enzyme';

const mockStore = configureStore();

describe(
  'ShowModal Container', () => {
    let store,
      wrapper;

    const ownProps = { icon  : 'icon',
                       label : 'label', };

    beforeEach( () => {
      store = mockStore( { greeter: greeterInitialState, } );

      store.dispatch = jest.fn();

      wrapper = shallow( <ShowModal
        store={ store }
        { ...ownProps } /> );
    } );

    it(
      'maps state and dispatch to props', () => {
        const expectedAction = expect.objectContaining( {
          icon    : ownProps.icon,
          label   : ownProps.label,
          onClick : expect.any( Function ),
        } );

        expect( wrapper.props() ).toEqual( expectedAction );
      }
    );

    describe(
      'onClick', () => {
        it(
          'maps TOGGLE_TODO_MODAL to dispatch action', () => {
            const expectedAction = { type: TOGGLE_TODO_MODAL, };

            wrapper.props().onClick();

            expect( store.dispatch ).toHaveBeenCalledWith( expectedAction );
          }
        );
      }
    );
  }
);
