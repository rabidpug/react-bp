//@flow

type stateType = {
  newTodoValue: string,
  todosArray: Array<{ completedDate: Date | string, id: number, text: string, createdDate: Date }>,
};
type toggleTodoActionType = {
  payload: Object,
  type: string,
};
type addTodoActionType = {
  payload: Date,
  type: string,
};
type newTodoValueActionType = {
  payload: string,
  type: string,
};
export const addTodoReducer = (
  state: stateType, action: addTodoActionType
) => {
  const text = state.newTodoValue;
  const createdDate = action.payload;
  const id = state.todosArray.length;
  const completedDate = '';

  state.todosArray.push( {
    completedDate,
    createdDate,
    id,
    text,
  } );

  state.newTodoValue = '';
};
export const toggleTodoReducer = (
  state: stateType, action: toggleTodoActionType
) => {
  const { id, completedDate, } = action.payload;

  state.todosArray[id].completedDate = state.todosArray[id].completedDate ? '' : completedDate;
};
export const newTodoValueReducer = (
  state: stateType, action: newTodoValueActionType
) => {
  const newTodoValue = action.payload;

  state.newTodoValue = newTodoValue;
};
