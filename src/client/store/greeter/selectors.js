import createSelector from 'selectorator';

const selectors = {
  isLoading : createSelector( [ 'greeter.isLoading', ] ),
  messages  : createSelector( [ 'greeter.messages', ] ),
};

export default selectors;
