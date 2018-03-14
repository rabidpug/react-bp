//@flow

type stateType = {
  newTodoValue: string,
  todosArray: Array<{ completedDate: Date | string, id: string, text: string, createdDate: string }>,
};
type toggleTodoActionType = {
  payload: { id: string, completedDate: string },
  type: string,
};
type addTodoActionType = {
  payload: string,
  type: string,
};
type newTodoValueActionType = {
  payload: string,
  type: string,
};
type deleteTodoActionType = {
  payload: string,
  type: string,
};
export const addTodoReducer = (
  state: stateType, action: addTodoActionType
) => {
  const text = state.newTodoValue;
  const createdDate = action.payload;
  const id = text + new Date( createdDate ).getTime()
    .toString( 36 );
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
  let index = -1;

  state.todosArray.forEach( (
    todo, i
  ) => todo.id === id ? index = i : '' );

  state.todosArray[index].completedDate = state.todosArray[index].completedDate ? '' : completedDate;
};
export const newTodoValueReducer = (
  state: stateType, action: newTodoValueActionType
) => {
  const newTodoValue = action.payload;

  state.newTodoValue = newTodoValue;
};

export const deleteTodoReducer = (
  state: stateType, action: deleteTodoActionType
) => {
  const id = action.payload;
  let index = -1;

  state.todosArray.forEach( (
    todo, i
  ) => todo.id === id ? index = i : '' );

  state.todosArray.splice(
    index, 1
  );
};
