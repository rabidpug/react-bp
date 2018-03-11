//@flow

type stateType = Array<{ completed: boolean, id: number, text: string }>;
type toggleTodoActionType = {
  payload: number,
  type: string,
};
type addTodoActionType = {
  payload: string,
  type: string,
};

export const addTodoReducer = (
  state: stateType, action: addTodoActionType
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
export const toggleTodoReducer = (
  state: stateType, action: toggleTodoActionType
) => {
  const index = action.payload;

  state[index].completed = !state[index].completed;
};
