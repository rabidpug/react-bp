import { ADD_TODO, } from '../../../../src/client/store/todos/types';
import AddTodoModal from '../../../../src/client/containers/AddTodoModal';
import React from 'react';
import { TOGGLE_TODO_MODAL, } from '../../../../src/client/store/ui/types';
import configureStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import { todosInitialState, } from '../../../../src/client/store/todos';
import { uiInitialState, } from '../../../../src/client/store/ui';

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
