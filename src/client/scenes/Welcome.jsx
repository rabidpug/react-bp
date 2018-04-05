import FadeWrap from 'Animations/FadeWrap';
import HelloMessage from 'Components/Message/HelloMessage';
import React from 'react';

const Welcome = FadeWrap( ( { style, } ) => (
  <div style={ { ...style, } }>
    <HelloMessage />
  </div>
) );

export default Welcome;
