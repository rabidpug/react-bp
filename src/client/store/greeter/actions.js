//@flow

import { createAction, } from 'redux-actions';

type stateType = {
  message: string,
  label: string,
  isDisabled: boolean,
};
type sayHelloActionType = {
  payload: string,
  type: string,
};

// Types
export const SAY_HELLO = 'SAY_HELLO';

// Action Creators
export const sayHello: Function = createAction( SAY_HELLO );

//Actions
export const sayHelloAction = (
  state: stateType, action: sayHelloActionType
) => {
  state.message = action.payload;

  state.label = 'Thanks!';

  state.isDisabled = true;
};
