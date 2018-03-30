import FadeWrap from '../animations/FadeWrap';
import HelloButton from 'Containers/HelloButton';
import HelloMessage from 'Containers/HelloMessage';
import React from 'react';

const Welcome = FadeWrap( ( { style, } ) => (
  <div style={ { ...style, } }>
    <HelloMessage />
    <HelloButton />
  </div>
) );

export default Welcome;
