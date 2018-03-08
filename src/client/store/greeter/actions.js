import { createAction, } from 'redux-actions';

// Types
export const SAY_HELLO = 'SAY_HELLO';

// Action Creators
export const sayHello = createAction( SAY_HELLO );

//Actions
export const sayHelloAction = (
  state, action
) => {
  state.message = action.payload;

  state.label = 'Thanks!';

  state.isDisabled = true;
};
