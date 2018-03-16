import { ADD_TODO, NEW_TODO_VALUE, } from 'Store/todos/types';

import AddTodoInput from 'Containers/AddTodoInput';
import React from 'react';
import { TOGGLE_TODO_MODAL, } from 'Store/ui/types';
import configureStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import { todosInitialState, } from 'Store/todos';

const mockStore = configureStore();

describe(
  'AddTodoInput Container', () => {
    let store,
      wrapper;

    beforeEach( () => {
      store = mockStore( { todos: todosInitialState, } );

      store.dispatch = jest.fn();

      wrapper = shallow( <AddTodoInput store={ store } /> );
    } );

    it(
      'maps state and dispatch to props', () => {
        const expectedAction = expect.objectContaining( {
          onChange     : expect.any( Function ),
          onPressEnter : expect.any( Function ),
          placeholder  : 'Add a Todo item...',
          value        : '',
        } );

        expect( wrapper.props() ).toEqual( expectedAction );
      }
    );

    describe(
      'onPressEnter', () => {
        it(
          'maps TOGGLE_TODO_MODAL and ADD_TODO to dispatch action', () => {
            const expectedAction = { type: TOGGLE_TODO_MODAL, };
            const expectedAction2 = expect.objectContaining( { type: ADD_TODO, } );

            wrapper.props().onPressEnter();

            expect( store.dispatch ).toHaveBeenCalledWith( expectedAction );

            expect( store.dispatch ).toHaveBeenCalledWith( expectedAction2 );
          }
        );
      }
    );

    describe(
      'onChange', () => {
        it(
          'maps NEW_TODO_VALUE to dispatch action', () => {
            const payload = 'Todo';
            const expectedAction = { payload,
                                     type: NEW_TODO_VALUE, };
            const fauxEvent = { target: { value: payload, }, };

            wrapper.props().onChange( fauxEvent );

            expect( store.dispatch ).toHaveBeenCalledWith( expectedAction );
          }
        );
      }
    );
  }
);
