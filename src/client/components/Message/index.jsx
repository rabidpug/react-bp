import { Avatar, } from 'antd';
import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import styles from 'Styles/Message';

const Message = ( { message, timestamp, userProfile, isUser, } ) => (
  <div
    className={ classnames( styles.messageCard, {
      [styles.cardLeft]  : !isUser,
      [styles.cardRight] : isUser,
    } ) }>
    <div className={ styles.messageTop }>
      {!isUser && <Avatar
        className={ styles.messageAvatar }
        src={ userProfile.photos } />}
      <div
        className={ classnames( styles.messageUserDate, {
          [styles.alignLeft]  : !isUser,
          [styles.alignRight] : isUser,
        } ) }>
        <div
          style={ {
            color      : 'hsl(0,0%,13%)',
            fontSize   : '0.85rem',
            fontWeight : 700,
          } }>
          {userProfile.displayNames}
        </div>
        <div
          style={ {
            color      : 'hsl(0,0%,45%)',
            fontSize   : '0.6rem',
            fontWeight : 400,
          } }>
          {moment( timestamp ).format( 'HH:mm:ss DD/MM/YYYY' )}
        </div>
      </div>
      {isUser && <Avatar
        className={ styles.messageAvatar }
        src={ userProfile.photos } />}
    </div>
    <div
      className={ classnames( styles.messageBox, {
        [styles.alignLeft]  : !isUser,
        [styles.alignRight] : isUser,
      } ) }>
      {message}
    </div>
  </div>
);

export default Message;
