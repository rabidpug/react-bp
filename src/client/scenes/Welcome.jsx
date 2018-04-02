import FadeWrap from 'Animations/FadeWrap';
import HelloButton from 'Components/Button/HelloButton';
import HelloMessage from 'Components/Message/HelloMessage';
import React from 'react';

const Welcome = FadeWrap( ( { style, } ) => (
  <div style={ { ...style, } }>
    <HelloMessage />
    <HelloButton />
  </div>
) );

export default Welcome;
