import produce from 'immer';
import types from '../types';

const reducers = {
  [types.TOGGLE_IN_PROGRESS]: produce( ( draft, { payload, } ) => {
    draft[payload] = !draft[payload];
  } ),
};

export default reducers;
