import { DELETE_TODO, TOGGLE_TODO, } from 'Store/todos/types';

import React from 'react';
import TodoListItem from 'Containers/TodoListItem';
import actionMenu from 'Routes/actionMenu';
import configureStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import { uiInitialState, } from 'Store/ui';

const mockStore = configureStore();

describe(
  'TodoListItem Container', () => {
    let store,
      wrapper;
    const ownProps = { route: actionMenu[0], };

    beforeEach( () => {
      store = mockStore( { ui: uiInitialState, } );

      store.dispatch = jest.fn();

      wrapper = shallow( <TodoListItem
        store={ store }
        { ...ownProps } /> );
    } );

    it(
      'maps state and dispatch to props', () => {
        const expectedAction = expect.objectContaining( { deleteTodoItem : expect.any( Function ),
                                                          toggleTodoItem : expect.any( Function ), } );

        expect( wrapper.props() ).toEqual( expectedAction );
      }
    );

    describe(
      'toggleTodoItem', () => {
        it(
          'maps TOGGLE_TODO to dispatch action', () => {
            const expectedAction = { type: TOGGLE_TODO, };

            wrapper.props().toggleTodoItem();

            expect( store.dispatch ).toHaveBeenCalledWith( expect.objectContaining( expectedAction ) );
          }
        );
      }
    );

    describe(
      'deleteTodoItem', () => {
        it(
          'maps DELETE_TODO to dispatch action', () => {
            const expectedAction = { type: DELETE_TODO, };

            wrapper.props().deleteTodoItem();

            expect( store.dispatch ).toHaveBeenCalledWith( expectedAction );
          }
        );
      }
    );
  }
);
