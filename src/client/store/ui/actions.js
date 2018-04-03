//@flow

import {
  TOGGLE_KEY,
  TOGGLE_SIDEBAR,
  TOGGLE_UPDATE,
} from './types';

import { createActions, } from 'redux-actions';

export const {
  toggleSidebar, toggleKey, toggleUpdate,
} = createActions(
  TOGGLE_SIDEBAR, TOGGLE_KEY, TOGGLE_UPDATE
);
