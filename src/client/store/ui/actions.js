//@flow

import { TOGGLE_KEY, TOGGLE_SIDEBAR, } from './types';

import { createActions, } from 'redux-actions';

export const { toggleSidebar, toggleKey, } = createActions(
  TOGGLE_SIDEBAR, TOGGLE_KEY
);
