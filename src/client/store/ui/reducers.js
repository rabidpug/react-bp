//@flow
import { Button, notification, } from 'antd';

import React from 'react';

type stateType = { isSidebarCollapsed: boolean, openKeys: Array<string>, isUpdateAvailable: boolean };
type toggleKeyActionType = {
  payload: string,
  type: string,
};

export const toggleSidebarReducer = ( state: stateType ) => {
  state.isSidebarCollapsed = !state.isSidebarCollapsed;
};
export const toggleKeyReducer = (
  state: stateType, action: toggleKeyActionType
) => {
  const key = action.payload;

  state.openKeys.includes( key ) ? state.openKeys.splice(
    state.openKeys.indexOf( key ), 1
  ) : state.openKeys.push( key );
};

export const toggleUpdateReducer = ( state: stateType ) => {
  state.isUpdateAvailable = !state.isUpdateAvailable;

  if ( state.isUpdateAvailable ) {
    const key = `open${Date.now()}`;

    const btn = (
      <Button
        onClick={ () => window.location.reload() }
        size='small'
        type='primary'>
        Update Now
      </Button>
    );

    notification.open( {
      btn,
      description : 'An update to the app is available',
      key,
      message     : 'Update Available',
    } );
  }
};
