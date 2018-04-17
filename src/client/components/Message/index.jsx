import { Avatar, } from 'antd';
import MicroLinkCard from 'react-microlink';
import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import noImage from 'Assets/noImage.png';
import styles from 'Styles/Message';
const urlsFinder = /(^| )(?:http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([a-z0-9]+(?:[-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(?::[0-9]{1,5})?(?:\/.*)?)(?=$| )/gi;
const Message = ( { message, timestamp, userProfile, isUser, } ) => (
  <div
    className={ classnames( styles.messageCard, {
      [styles.cardLeft]  : !isUser,
      [styles.cardRight] : isUser,
    } ) }>
    <div className={ styles.messageTop }>
      {!isUser && (
        <Avatar
          className={ styles.messageAvatar }
          src={ userProfile.photos === 'Anonymous' ? noImage : userProfile.photos }
        />
      )}
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
      {isUser && (
        <Avatar
          className={ styles.messageAvatar }
          src={ userProfile.photos === 'Anonymous' ? noImage : userProfile.photos }
        />
      )}
    </div>
    <div
      className={ classnames( styles.messageBox, {
        [styles.alignLeft]  : !isUser,
        [styles.alignRight] : isUser,
      } ) }>
      <span
        dangerouslySetInnerHTML={ {
          __html: message.replace( urlsFinder,
                                   match => `<a
            href='https://${match}'
            target='_blank'>
            ${match}
          </a>` ),
        } }
      />
      {urlsFinder.test( message ) && (
        <MicroLinkCard
          screenshot
          style={ {
            margin   : 5,
            minWidth : '30vw',
          } }
          url={ `https://${message.match( urlsFinder )[0].toLowerCase()}` }
        />
      )}
    </div>
  </div>
);

export default Message;
