//@flow

type stateType = {
  message: string,
  label: string,
  isDisabled: boolean,
};
type sayHelloActionType = {
  payload: string,
  type: string,
};

export const sayHelloReducer = (
  state: stateType, action: sayHelloActionType
) => {
  state.message = action.payload;

  state.label = 'Thanks!';

  state.isDisabled = true;
};
