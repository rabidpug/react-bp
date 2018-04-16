import createSelector from 'selectorator';
const selectors = {
  inProgress: createSelector( [
    {
      argIndex : 0,
      path     : 'inProgress',
    },
    {
      argIndex : 1,
      path     : 0,
    },
  ],
                              ( inProgress, key ) => inProgress[key] ),
};

export default selectors;
