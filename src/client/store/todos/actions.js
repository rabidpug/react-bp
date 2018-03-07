export const addTodoAction = (
  state, action
) => {
  const text = action.payload;
  const completed = false;
  const id = state.length;

  state.push( {
    completed,
    id,
    text,
  } );
};
export const toggleTodoAction = (
  state, action
) => {
  const index = action.payload;

  state[index].completed = !state[index].completed;
};
