import FilterLink from 'Containers/FilterLink';
import React from 'react';
import { SET_VISIBILITY_FILTER, } from 'Store/todoVisibility/types';
import configureStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import { todosInitialState, } from 'Store/todos';

const mockStore = configureStore();

describe(
  'FilterLink Container', () => {
    let store,
      wrapper;
    const ownProps = { icon  : 'icon',
                       label : 'label', };

    beforeEach( () => {
      store = mockStore( { todos: todosInitialState, } );

      store.dispatch = jest.fn();

      wrapper = shallow( <FilterLink
        store={ store }
        { ...ownProps } /> );
    } );

    it(
      'maps state and dispatch to props', () => {
        const expectedAction = expect.objectContaining( { ...ownProps,
                                                          onClick: expect.any( Function ), } );

        expect( wrapper.props() ).toEqual( expectedAction );
      }
    );

    describe(
      'onClick', () => {
        it(
          'maps SET_VISIBILITY_FILTER to dispatch action', () => {
            const expectedAction = { type: SET_VISIBILITY_FILTER, };

            wrapper.props().onClick();

            expect( store.dispatch ).toHaveBeenCalledWith( expectedAction );
          }
        );
      }
    );
  }
);
