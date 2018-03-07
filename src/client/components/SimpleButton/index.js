// @flow

import { Button, } from 'semantic-ui-react';
import React from 'react';

type Props = {
  label: string,
  handleClick: Function,
  isDisabled: boolean,
};

const SimpleButton: Function = ( {
  label, handleClick, isDisabled,
}: Props ) =>
  ( <Button
    content={ label }
    disabled={ isDisabled }
    onClick={ handleClick } /> );

export default SimpleButton;

