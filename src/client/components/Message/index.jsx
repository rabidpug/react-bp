// @flow

import HelloButton from '../Button/HelloButton';
import React from 'react';
import gStyles from 'Styles/global';
const Message = ( { message, }: { message: string } ) => (
  <span className={ gStyles.cardStyle }>
    <div className={ gStyles.cardTop }>
      <p>{message}</p>
    </div>
    <div className={ gStyles.cardBottom }>
      <HelloButton />
    </div>
  </span>
);

export default Message;
