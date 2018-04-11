// @flow

import HelloButton from '../Button/HelloButton';
import React from 'react';
import gStyles from 'Styles/global';

const Message = ( { message, style, }: { message: string, style: any } ) => (
  <div
    className={ gStyles.cardStyle }
    style={ { ...style, } }>
    <div className={ gStyles.cardHeader }>
      <h1>Welcome Message</h1>
    </div>
    <div className={ gStyles.cardTop }>
      <p>{message}</p>
    </div>
    <div className={ gStyles.cardBottom }>
      <HelloButton />
    </div>
  </div>
);

export default Message;
