import { Button, notification, } from 'antd';

import React from 'react';

const simpleNotification = ( message, description, buttonLabel ) => {
  const key = `open${Date.now()}`;

  const btn = buttonLabel && (
    <Button
      onClick={ () => {
        notification.close( key );

        window.location.reload();
      } }
      size='small'
      type='primary'>
      {buttonLabel}
    </Button>
  );

  notification.open( {
    btn,
    description,
    key,
    message,
  } );
};

export default simpleNotification;
