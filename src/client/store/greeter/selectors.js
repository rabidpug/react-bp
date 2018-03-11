import { createSelector, } from '@acemarke/redux-starter-kit';

export const getGreeterButton = createSelector( { isDisabled : 'greeter.isDisabled',
                                                  label      : 'greeter.label', } );
export const getGreeterMessage = createSelector( [ 'greeter.message', ] );
