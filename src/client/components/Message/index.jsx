import MiniCard from 'Components/MiniCard';
import React from 'react';
import { formatDate, } from 'Helpers/formatDate';
import noImage from 'Assets/noImage.png';
const Message = ( { message, timestamp, userProfile, isUser, } ) => (
  <MiniCard alignRight={ isUser }>
    <MiniCard.Header
      avatar={ userProfile.photos === 'Anonymous' ? noImage : userProfile.photos }
      description={ formatDate( timestamp ) }
      title={ userProfile.displayNames }
    />
    <MiniCard.Body message={ message } />
  </MiniCard>
);

export default Message;
