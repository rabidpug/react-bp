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

export const sayHelloRequestReducer = ( state: stateType ) => {
  state.message = 'Loading...';

  state.label = 'Loading...';

  state.isDisabled = true;
};

export const sayHelloSuccessReducer = (
  state: stateType, action: sayHelloActionType
) => {
  state.message = action.payload;

  state.label = 'Say it again!';

  state.isDisabled = false;
};

export const sayHelloFailureReducer = ( state: stateType ) => {
  state.message = 'No message received, please check your connection and try again';

  state.label = 'Try saying hi again!';

  state.isDisabled = false;
};
