// @flow

import { Button, } from 'antd';
import React from 'react';

type Props = {
  label: string,
  handleClick: Function,
  isDisabled: boolean,
};

const SimpleButton: Function = ( {
  label, handleClick, isDisabled,
}: Props ) => (
  <Button
    disabled={ isDisabled }
    onClick={ handleClick }
    type='primary'>
    {label}
  </Button>
);

export default SimpleButton;
