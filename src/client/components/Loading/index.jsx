// @flow

import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faSpinner, } from '@fortawesome/free-solid-svg-icons';

const Loading: Function = ( { error, timedOut, } ) => {
  if ( error || timedOut ) window.location.reload();

  return (
    <FontAwesomeIcon
      icon={ faSpinner }
      size='2x'
      spin
      style={ {
        bottom   : 0,
        left     : 0,
        margin   : 'auto',
        position : 'absolute',
        right    : 0,
        top      : 0,
      } }
    />
  );
};

export default Loading;
