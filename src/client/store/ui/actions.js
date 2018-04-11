//@flow

import { IS_ONLINE, TOGGLE_KEY, TOGGLE_SIDEBAR, } from './types';

import { createActions, } from 'redux-actions';

export const { toggleSidebar, toggleKey, isOnline, } = createActions( TOGGLE_SIDEBAR, TOGGLE_KEY, IS_ONLINE );
