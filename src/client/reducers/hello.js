// @flow

import type { fromJS as Immut, } from 'immutable';
import Immutable from 'immutable';
import { SAY_HELLO, } from '../actions/hello';

const initialState = Immutable.fromJS( { message: 'Initial reducer message',  } );

const hello = (
  state: Immut = initialState, action: { type: string, payload: any }
) => {
  switch ( action.type ) {
  case SAY_HELLO:
    return state.set(
      'message', action.payload
    );
  default:
    return state;
  }
};

export default hello;
