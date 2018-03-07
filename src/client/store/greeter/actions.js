export const sayHelloAction = (
  state, action
) => {
  state.message = action.payload;

  state.label = 'Thanks!';

  state.isDisabled = true;
};
