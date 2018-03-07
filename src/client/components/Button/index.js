// @flow

import React from 'react';

type Props = {
  label: string,
  handleClick: Function,
  isDisabled: boolean,
};

const Button: Function = ( {
  label, handleClick, isDisabled,
}: Props ) =>
  ( <button
    disabled={ isDisabled }
    onClick={ handleClick } >
    {label}
  </button> );

export default Button;

