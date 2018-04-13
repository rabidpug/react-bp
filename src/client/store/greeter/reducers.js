//@flow

type stateType = {
  messages: Array<string>,
  label: string,
  isLoading: boolean,
};
type sayHelloActionType = {
  payload: string,
  type: string,
};

export const sayHelloRequestReducer = ( state: stateType ) => {
  state.isLoading = true;
};

export const sayHelloSuccessReducer = ( state: stateType, action: sayHelloActionType ) => {
  state.messages.push( action.payload );

  state.isLoading = false;
};

export const sayHelloFailureReducer = ( state: stateType ) => {
  state.messages.push( 'An error has occurred!' );

  state.isLoading = false;
};
