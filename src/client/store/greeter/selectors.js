import { createSelector, } from '@acemarke/redux-starter-kit';

export const getGreeterIsLoading = createSelector( [ 'greeter.isLoading', ] );
export const getGreeterMessages = createSelector( [ 'greeter.messages', ] );
