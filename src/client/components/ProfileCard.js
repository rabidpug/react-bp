import { Card, } from 'antd';
import React from 'react';
import styles from './ProfileCard.scss';

const { Meta, } = Card;

const ProfileCard = ( {
  photos, firstName, lastName, providers = {}, style,
} ) => (
  <Card
    cover={
      photos[0]
        ? <img
          alt='No Picture'
          src={ photos[0].value.replace(
            'sz=50', 'sz=300'
          ) } />
        :         <span className={ styles.noPicture }>No Picture</span>

    }
    style={ {
      margin    : 'auto',
      marginTop : 50,
      width     : 300,
      ...style,
    } }>
    <Meta
      description={ `Account Type: ${Object.keys( providers ).filter( provider => providers[provider] )}` }
      title={ firstName && lastName ? `${firstName} ${lastName}` : 'User Profile' }
    />
  </Card>
);

export default ProfileCard;
