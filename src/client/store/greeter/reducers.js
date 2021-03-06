import produce from 'immer';
import types from '../types';

const reducers = {
  [types.SAY_HELLO_RESPONSE]: produce( ( draft, { payload, } ) => {
    draft.messages.push( payload );
  } ),
};

export default reducers;
