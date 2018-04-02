import { createSelector, } from '@acemarke/redux-starter-kit';

export const getGreeterLabel = createSelector( [ 'greeter.label', ] );
export const getGreeterIsLoading = createSelector( [ 'greeter.isLoading', ] );
export const getGreeterMessage = createSelector( [ 'greeter.message', ] );
