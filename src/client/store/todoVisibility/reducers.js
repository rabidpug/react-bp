//@flow

type setVisibilityActionType = {
  type: string,
  payload: string,
};

export const setVisibilityFilterReducer = (
  state: string, action: setVisibilityActionType
) => action.payload;
