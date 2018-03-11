// @flow

import { Icon, } from 'antd';
import React from 'react';

type Props = {
  label: string,
  icon: string,
  key: string,
  onClick: Function,
};
const Link: Function = ( {
  label, icon, onClick,
}: Props ) => (
  <div
    onClick={ onClick }
    style={ { width: '100%', } }>
    <Icon type={ icon } />
    {label}
  </div>
);

export default Link;
