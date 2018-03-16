import { ADD_TODO, } from 'Store/todos/types';
import AddTodoModal from 'Containers/AddTodoModal';
import React from 'react';
import { TOGGLE_TODO_MODAL, } from 'Store/ui/types';
import configureStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import { todosInitialState, } from 'Store/todos';
import { uiInitialState, } from 'Store/ui';

const mockStore = configureStore();

describe(
  'AddTodoModal Container', () => {
    let store,
      wrapper;

    beforeEach( () => {
      store = mockStore( { todos : todosInitialState,
                           ui    : uiInitialState, } );

      store.dispatch = jest.fn();

      wrapper = shallow( <AddTodoModal store={ store } /> );
    } );

    it(
      'maps state and dispatch to props', () => {
        const expectedAction = expect.objectContaining( {
          okText   : 'Add Todo',
          onCancel : expect.any( Function ),
          onOk     : expect.any( Function ),
          title    : 'Add a new Todo',
          visible  : uiInitialState.todoModalVisibility,
        } );

        expect( wrapper.props() ).toEqual( expectedAction );
      }
    );

    describe(
      'onOk', () => {
        it(
          'maps TOGGLE_TODO_MODAL and ADD_TODO to dispatch action', () => {
            const expectedAction = { type: TOGGLE_TODO_MODAL, };
            const expectedAction2 = expect.objectContaining( { type: ADD_TODO, } );

            wrapper.props().onOk();

            expect( store.dispatch ).toHaveBeenCalledWith( expectedAction );

            expect( store.dispatch ).toHaveBeenCalledWith( expectedAction2 );
          }
        );
      }
    );

    describe(
      'onCancel', () => {
        it(
          'maps TOGGLE_TODO_MODAL to dispatch action', () => {
            const expectedAction = { type: TOGGLE_TODO_MODAL, };

            wrapper.props().onCancel();

            expect( store.dispatch ).toHaveBeenCalledWith( expectedAction );
          }
        );
      }
    );
  }
);
