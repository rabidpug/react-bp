import React from 'react';
import VisibleTodoList from '../../../../src/client/containers/VisibleTodoList';
import configureStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import { todosInitialState, } from '../../../../src/client/store/todos';
import { uiInitialState, } from '../../../../src/client/store/ui';

const mockStore = configureStore();

describe(
  'HomeTopBar Container', () => {
    let store,
      wrapper;

    beforeEach( () => {
      const createdOn = new Date().toString();

      todosInitialState.todosArray.push( {
        completedOn : '',
        createdOn,
        id          : `Todo 1${new Date( createdOn ).getTime()
          .toString( 36 )}`,
        text: 'Todo 1',
      } );

      todosInitialState.todosArray.push( {
        completedOn : '',
        createdOn,
        id          : `Todo 2${new Date( createdOn ).getTime()
          .toString( 36 )}`,
        text: 'Todo 2',
      } );

      store = mockStore( { todos : todosInitialState,
                           ui    : uiInitialState, } );

      store.dispatch = jest.fn();

      wrapper = shallow( <VisibleTodoList store={ store } /> );
    } );

    it(
      'maps state and dispatch to props', () => {
        const expectedAction = expect.objectContaining( {
          dataSource : expect.any( Array ),
          header     : 'Your Todo Items',
          itemLayout : 'vertical',
          renderItem : expect.any( Function ),
        } );

        expect( wrapper.props() ).toEqual( expectedAction );
      }
    );
  }
);
